import {
  MouseReocrd,
  MouseTypes,
  Observer,
  Listener,
  DragTypes,
} from "../models/observers";
import { _throttle, _log, _warn } from "../tools/helpers";
import { RECORDER_PRESET } from "../constants";
import EventDrivenable from "../tools/pub-sub";

/**
 * Observe mouse behavior
 * and produce an Record
 */
export default class MouseObserver extends EventDrivenable implements Observer {
  public listeners: Listener[] = [];
  public options = RECORDER_PRESET.mouse;

  constructor(options?: any) {
    super();
    if (typeof options === "boolean" && options === false) {
      return;
    }

    if (typeof options === "object") {
      this.options = { ...this.options, ...options };
    }
  }

  private addListener = (
    { target, event, callback, options = false }: Listener,
    cb?: () => void
  ) => {
    target.addEventListener(event, callback, options);

    this.listeners.push({
      target,
      event,
      callback,
    });

    try {
      cb && cb();
    } catch (err) {
      _warn(err);
    }
  };

  private getMouseClickRecord = (evt: MouseEvent): void => {
    const { pageX: x, pageY: y } = evt;
    const record: MouseReocrd = { type: MouseTypes.click, x, y };
    const { $emit } = this;

    $emit("observed", record);
  };

  private getMouseMoveRecord = (evt: MouseEvent): void => {
    const { pageX: x, pageY: y } = evt;
    const record: MouseReocrd = { type: MouseTypes.move, x, y };
    const { $emit } = this;

    $emit("observed", record);
  };

  private getMouseDblclickRecord = (evt: MouseEvent): void => {
    const { pageX: x, pageY: y } = evt;
    const record: MouseReocrd = { type: MouseTypes.dblclick, x, y };
    const { $emit } = this;

    $emit("observed", record);
  };

  private getMouseRightclickRecord = (evt: PointerEvent): void => {
    const { pageX: x, pageY: y } = evt;
    const record: MouseReocrd = { type: MouseTypes.rightClick, x, y };
    const { $emit } = this;

    $emit("observed", record);
  };

  //此处进行优化，合并处理，节约前端数据通讯量
  // private getMouseDownRecord = (evt: MouseEvent): void => {
  //   const { pageX: x, pageY: y } = evt
  //   const record: MouseReocrd = { type: MouseTypes.mousedown, x, y }
  //   const { $emit } = this

  //   $emit('observed', record)
  // }
  // private getMouseUpRecord = (evt: MouseEvent): void => {
  //   const { pageX: x, pageY: y } = evt
  //   const record: MouseReocrd = { type: MouseTypes.mouseup, x, y }
  //   const { $emit } = this

  //   $emit('observed', record)
  // }

  private getMouseDragRecord = (evt: DragEvent): void => {
    const { pageX: x, pageY: y, type } = evt;
    const record: MouseReocrd = { type: type as DragTypes, x, y };
    const { $emit } = this;

    $emit("observed", record);
  };

  private getMouseDragDropRecord = (evt: DragEvent): void => {
    console.log('getMouseDragDropRecord',evt)
    const { pageX: x, pageY: y, type, dataTransfer } = evt;
    const files = dataTransfer.files;
    const filesTag = [];
    const formData = new FormData();
    for (let index = 0; index < files.length; index++) {
      const file = files[index];
      const tag = (file.name||'').split('.')[0]||Math.random()
        .toString(36)
        .substring(2);
      formData.append(tag, file);
      filesTag.push(tag);
    }
    formData.append("_id", "628b6d4f1fde64d672cf7769");
    const myHeaders = new Headers();
    myHeaders.append(
      "Authorization",
      "Bearer eyJhbGciOiJIUzI1NiJ9.dGVzdA.GfxRk-CtH6rXPrQstXkm8pkjEhPFO1h5kFEBciCZN48"
    );
    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: formData,
      redirect: "follow",
    };
    fetch("http://localhost:7001/records/upload", requestOptions as RequestInit)
      .then((response) => response.text())
      .then((result) => console.log(result))
      .catch((error) => console.log("error", error));

    const record: MouseReocrd = {
      type: type as DragTypes,
      x,
      y,
      tag: filesTag,
    };
    const { $emit } = this;

    $emit("observed", record);
  };

  public install(): void {
    const { addListener } = this;

    const { click, mousemove, dblclick, rightClick, drag } = this.options;

    if (click) {
      addListener({
        target: document,
        event: "click",
        callback: this.getMouseClickRecord,
      });
    }

    if (mousemove) {
      addListener({
        target: document,
        event: "mousemove",
        callback: _throttle(this.getMouseMoveRecord, 50),
      });
    }

    if (dblclick) {
      addListener({
        target: document,
        event: "dblclick",
        callback: this.getMouseDblclickRecord,
      });
    }

    if (rightClick) {
      addListener({
        target: document,
        event: "contextmenu",
        callback: this.getMouseRightclickRecord,
      });
    }

    if (drag) {
      addListener({
        target: document,
        event: "dragstart",
        callback: this.getMouseDragRecord,
      });
      addListener({
        target: document,
        event: "drag",
        callback: _throttle(this.getMouseDragRecord, 50),
      });
      addListener({
        target: document,
        event: "dragenter",
        callback: this.getMouseDragRecord,
      });
      addListener({
        target: document,
        event: "dragover",
        callback: _throttle(this.getMouseDragRecord, 50),
      });
      addListener({
        target: document,
        event: "drop",
        callback: this.getMouseDragDropRecord,
      });
      addListener({
        target: document,
        event: "dragend",
        callback: this.getMouseDragRecord,
      });
      addListener({
        target: document,
        event: "dragleave",
        callback: this.getMouseDragRecord,
      });
    }
    // if(mousedown){
    //   addListener({
    //     target: document,
    //     event: 'mousedown',
    //     callback: this.getMouseDownRecord
    //   })
    // }

    // if(mouseup){
    //   addListener({
    //     target: document,
    //     event: 'mouseup',
    //     callback: this.getMouseUpRecord
    //   })
    // }
    _log("mouse observer ready!");
  }

  public uninstall() {
    this.listeners.forEach(({ target, event, callback }) => {
      target.removeEventListener(event, callback);
    });
  }
}
