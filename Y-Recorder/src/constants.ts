export const RECORDER_ID: string = 'recorder-id'

export const RECORDER_PRESET = {
  mutation: true,
  history: true,
  error: {
    jserror: true,
    unhandledrejection: true
  },
  console: {
    info: true,
    error: true,
    log: false,
    warn: true,
    debug: false
  },
  event: {
    scroll: true,
    resize: true,
    form: true
  },
  http: {
    xhr: true,
    fetch: true,
    beacon: true
  },
  mouse: {
    click: true,
    drag: true,
    mousemove: true,
    dblclick: true,
    rightClick: true,
    mousedown: true,
    mouseup: true
  },
  Keyboard:{
    keydown:true,
    keypress:true,
    keyup:true,
  },

  maxTimeSpan: 120000 // max time span of trail
}
