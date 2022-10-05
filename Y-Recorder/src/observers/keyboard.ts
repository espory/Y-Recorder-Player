import { Observer, Listener, KeyboardTypes, KeyboardReocrd } from '../models/observers'
import { _throttle, _log, _warn } from '../tools/helpers'
import { RECORDER_PRESET } from '../constants'
import EventDrivenable from '../tools/pub-sub'

/**
 * Observe mouse behavior
 * and produce an Record
 */
export default class KeyboardObserver extends EventDrivenable implements Observer {
  public listeners: Listener[] = []
  public options = RECORDER_PRESET.Keyboard;

  constructor(options?: any) {
    super()
    if (typeof options === 'boolean' && options === false) {
      return
    }

    if (typeof options === 'object') {
      this.options = { ...this.options, ...options }
    }
  }

  private addListener = ({ target, event, callback, options = false }: Listener, cb?: () => void) => {
    target.addEventListener(event, callback, options)

    this.listeners.push({
      target,
      event,
      callback
    })

    try {
      cb && cb()
    } catch (err) {
      _warn(err)
    }
  }

  private getKeypressRecord = (evt: KeyboardEvent): void => {
    const { key } = evt
    const record: KeyboardReocrd = { type: KeyboardTypes.keypress, key }
    const { $emit } = this

    $emit('observed', record)
  }

  
  public install(): void {
    const { addListener } = this

    const { keypress } = this.options
    
    if (keypress) {
      addListener({
        target: document,
        event: 'keypress',
        callback: _throttle(this.getKeypressRecord, 50)
      })
    }

    _log('keyboard observer ready!')
  }

  public uninstall() {
    this.listeners.forEach(({ target, event, callback }) => {
      target.removeEventListener(event, callback)
    })
  }
}
