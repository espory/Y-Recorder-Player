import { MutationRecordX } from '../models/index'
// import { RECORDER_ID } from '../constants'
import SonyA7R3 from '../tools/SonyA7R3'
import { _log, _warn } from '../tools/helpers'
import EventDrivenable from '../tools/pub-sub'
import { Observer, DOMMutationRecord } from '../models/observers'
// import { Observer, DOMMutationRecord, DOMMutationTypes, NodeMutationData } from '../models/observers'

// const { getRecordIdByElement } = SonyA7R3

/**
 * Observe DOM change such as DOM-add/remove text-change attribute-change
 * and generate an Record
 */
export default class DOMMutationObserver extends EventDrivenable implements Observer {
  private observer: MutationObserver

  constructor(options: boolean) {
    super()

    if (options === false) return
  }

  private process(mutationRecord: MutationRecordX) {
    try {
      const { target } = mutationRecord

      // ignore script tag's mutation
      if (target && target.tagName === 'SCRIPT') return

      switch (mutationRecord.type) {
        // case 'attributes': {
        //   // ignore recorderId mutate
        //   if (attributeName === RECORDER_ID) return

        //   return this.getAttrReocrd(mutationRecord)
        // }

        // case 'characterData': {
        //   return this.getTextRecord(mutationRecord)
        // }

        case 'childList': {
          return this.getNodesRecord(mutationRecord)
        }

        default: {
          return
        }
      }
    } catch (error) {
      _warn(error)
    }
  }

  private getNodesRecord({
    addedNodes,
    removedNodes,
  }: MutationRecordX): DOMMutationRecord {


    /** ------------------------------ Add or Remove nodes --------------------------------- */
    const { length: isAdd } = addedNodes
    const { length: isRemove } = removedNodes

    if (!isAdd && !isRemove) return

    // add and remove node could happen in the same record
    // record.type = DOMMutationTypes.node

    // Add element or textNode
    this.nodesFilter(addedNodes).forEach((node): void => {
      // let nodeData = {} as NodeMutationData
      switch (node.nodeName) {
        case '#text': {
          break
        }
        default: {
          SonyA7R3.bufferNewElement(node)
        }
      }
    })
  }

  // filter out comment and script
  private nodesFilter(nodeList: NodeList): HTMLElement[] {
    return Array.prototype.slice.call(nodeList).filter(node => {
      const { nodeName, tagName } = node as HTMLElement
      return nodeName !== '#comment' && tagName !== 'SCRIPT'
    }) as HTMLElement[]
  }

  public install() {
    const mutationObserver = (window as any).MutationObserver || (window as any).WebKitMutationObserver

    this.observer = new mutationObserver((records: MutationRecord[]) => {
      // const { $emit } = this

      for (let record of records) {
        // const DOMMutationRecord = this.process(record as MutationRecordX)
        this.process(record as MutationRecordX)

        // if (DOMMutationRecord) {
        //   $emit('observed', DOMMutationRecord)
        // }
      }
    })

    this.observer.observe(document.documentElement, {
      attributes: true,
      childList: true,
      characterData: true,
      subtree: true
    })

    _log('mutation observer ready!')
  }

  public uninstall() {
    if (this.observer) {
      this.observer.disconnect()
      this.observer = null
    }
  }
}
