import { Recorder, Observers, ObserverName, ElementX } from './models/index'
import { Observer } from './models/observers'
import { _log, _warn, _now, _throttle } from './tools/helpers'
import { RECORDER_PRESET } from './constants'

import ConsoleObserver from './observers/console'
import EventObserver from './observers/event'
import HttpObserver from './observers/http'
import DOMMutationObserver from './observers/mutation'
import ErrorObserver from './observers/error'
import HistoryObserver from './observers/history'
import MouseObserver from './observers/mouse'

import SonyA7R3 from './tools/SonyA7R3'
import createUI from './tools/ui'
import KeyboardObserver from 'observers/keyboard'
class SessionRecorder implements Recorder {
  public observers: Observers = {
    mutation: null,
    console: null,
    event: null,
    mouse: null,
    keyboard:null,
    error: null,
    history: null,
    http: null
  }
  public options = RECORDER_PRESET
  public trail: any[] = []
  public recording: boolean = false
  private baseTime: number = 0

  private lastSnapshot: { time: number; index: number } = {
    time: 0,
    index: 0
  }

  constructor(options?) {
    if (options && typeof options === 'object') {
      this.options = { ...this.options, ...options }
    }

    // const { history, http, event, error, console: consoleOptions, mouse } = this.options
    const { mutation, history, http, event, error, console: consoleOptions, mouse,Keyboard } = this.options

    this.observers = {
      mutation: new DOMMutationObserver(mutation),
      http: new HttpObserver(http),
      console: new ConsoleObserver(consoleOptions),
      event: new EventObserver(event),
      mouse: new MouseObserver(mouse),
      error: new ErrorObserver(error),
      history: new HistoryObserver(history),
      keyboard: new KeyboardObserver(Keyboard)
    }

    Object.keys(this.observers).forEach((observerName: ObserverName) => {
      const observer = this.observers[observerName]

      observer.$on('observed', this.pushToTrail.bind(this))
    })
  }

  public observeScroll = (ele: ElementX) => {
    if (ele) {
      ele.addEventListener('scroll', _throttle((this.observers.event as any).getScrollRecord))
    } else {
      _warn("Element doesn't existsed!")
    }
  }
  private pushToTrail = (record): void => {
    if (!this.recording) return
    const thisRecordTime = _now() - this.baseTime

    record = { t: thisRecordTime, ...record }
    const { time: lastSnapshotTime, index: lastSnapshotIndex } = this.lastSnapshot

    if (thisRecordTime - lastSnapshotTime >= this.options.maxTimeSpan / 2) {
      if (lastSnapshotIndex !== 0) {
        this.trail = this.trail.slice(lastSnapshotIndex)
      }

      const snapshotRecord = this.getSnapshotRecord()
      this.trail.push(snapshotRecord)
    }

    this.trail.push(record)
  }

  private getSnapshotRecord() {
    this.lastSnapshot.time = _now() - (this.baseTime || _now())
    this.lastSnapshot.index = this.trail.length

    const { clientWidth: w, clientHeight: h } = document.documentElement
    const { x, y } = (this.observers.event as any).getScrollPosition()

    return {
      t: this.lastSnapshot.time,
      type: 'snapshot',
      scroll: { x, y },
      location:window.location,
      resize: {
        w,
        h
      },
      snapshot: SonyA7R3.takeSnapshotForPage() // document.documentElement.outerHTML
    }
  }

  public start = (): void => {
    if (this.recording) {
      _warn('record already started')
      return
    }

    this.recording = true

    this.baseTime = _now()
    // note the getSnapshotRecord method depend on baseTime
    this.trail[0] = this.getSnapshotRecord()

    Object.keys(this.observers).forEach(observerName => {
      if (this.options[observerName]) {
        ;(this.observers[observerName] as Observer).install()
      }
    })
    ;(window as any).SessionRecorder = this
  }

  public stop = (): void => {
    if (!this.recording) {
      _warn('record not started')
      return
    }

    this.recording = false

    // clear trail
    this.trail.length = 0
  }

  public uninstallObservers = (): void => {
    // walk and uninstall observers
    Object.keys(this.observers).forEach(observerName => {
      ;(this.observers[observerName] as Observer).uninstall()
    })
  }
}

const recorder = new SessionRecorder()
// const fetchRecord = {}
let startUrl = window.location.href;
let originUrl = window.location.origin;  //    http://localhost:8053/

const fetchEvent = ({url,method='POST',body})=>{
  return window.fetch(url, {
    "method": method,
    "headers": {
      "user-agent": "vscode-restclient",
      "content-type": "application/json",
      "authorization": "Bearer eyJhbGciOiJIUzI1NiJ9.dGVzdA.GfxRk-CtH6rXPrQstXkm8pkjEhPFO1h5kFEBciCZN48"
    },
    "body": JSON.stringify(body)
    })
}

const channel = new BroadcastChannel('y_record');
const startEvent = () => {
  recorder.start()
  // channel.postMessage('clear');
}
const stopEvent = () => {
  // console.log(fetchRecord)
  console.log(recorder.trail)
  channel.postMessage('upload');  //通知 service worker 上传数据
  fetchEvent({url:"http://localhost:7001/records/update",body:{
    _id: '628b6d4f1fde64d672cf7769',
    snapshot: {
      name: 'test',
      data: recorder.trail,
    },
    storage:{
      localStorage_record:localStorage,
      sessionStorage_record:sessionStorage
    },
    // fetchRecord,
    location:{
      startUrl:startUrl,
      originUrl:originUrl
    }
  }})
  recorder.stop()
}

const init = async() => {
  
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/yrecord_sw.js', { scope: '/' });
  }
  createUI({ startEvent, stopEvent })
}

init()
