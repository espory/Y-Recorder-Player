const DELETE = Symbol('DELETE');
//防止循环依赖
export function diff(obj, base, hash = new WeakMap()) {
  // if (obj === null) return obj;
  // if (obj instanceof Date) return new Date(obj);
  // if (obj instanceof RegExp) return new RegExp(obj);
  if (typeof obj !== "object" && typeof base !== "object") return obj===base;


  // if (hash.get(obj)) return hash.get(obj);
  // let cloneObj = new obj.constructor();
  // hash.set(obj, cloneObj);
  let isDlete = true;
  for (let key in obj) {
    if (base.hasOwnProperty(key)) {
      //类型不同，无需diff，直接保留
      if(typeof obj[key] !== typeof base[key]) {
        continue;
      }
      //类型相同，需要diff,剔除
      if(obj[key]===null&& base[key]===null) {
        delete obj[key];
      }
      if(typeof obj[key]!=='object' && base[key] !== 'object'&&obj[key] === base[key]) {
        delete obj[key];
      }else{
        isDlete = (isDlete&&diff(obj[key], base[key], hash));
        if(isDlete){
          delete obj[key];
        }
      }
    } else {
      //base没有
      base[key] = obj[key];
    }
    }
    if(isDlete){
      try {
        return true
    } catch (error) {
        debugger
      }
    }
    return false;
}

export function remove(obj, base, path, delArr) {
  for (let key in base) {
    if (obj.hasOwnProperty(key)) {
      remove(obj[key], base[key],[...path,key],delArr)
    }else{
      delArr.push([...path,key].join('@'))
    }
  }
}

export function stringifyEvent(e) {
  const obj = {};
  for (let k in e) {
    obj[k] = e[k];
  }
  return JSON.stringify(obj, (k, v) => {
    if (v instanceof Node) return 'Node';
    if (v instanceof Window) return 'Window';
    return v;
  }, ' ');
}

// const event1 = {
//   A:{
//     B:{
//       D:1,
//       E:2
//     },
//     C:3
//   }
// }

// const event2 = {
//   A:{
//     B:{
//       D:1,
//       E:2
//     },
//     C:4,
//     F:7
//   },
// }
// aa[DELETE] = [];
// remove(aa,bb,[],aa[DELETE])
// console.log(aa)
// diff(aa,bb)
// console.log(aa)


// const tt1 = {
//   "isTrusted": true,
//   "pointerId": 1,
//   "width": 1,
//   "height": 1,
//   "pressure": 0,
//   "tiltX": 0,
//   "tiltY": 0,
//   "azimuthAngle": 0,
//   "altitudeAngle": 1.5707963267948966,
//   "tangentialPressure": 0,
//   "twist": 0,
//   "pointerType": "mouse",
//   "isPrimary": false,
//   "screenX": 1611,
//   "screenY": 268,
//   "clientX": 1611,
//   "clientY": 164,
//   "ctrlKey": false,
//   "shiftKey": false,
//   "altKey": false,
//   "metaKey": false,
//   "button": 0,
//   "buttons": 0,
//   "relatedTarget": null,
//   "pageX": 1611,
//   "pageY": 203,
//   "x": 1611,
//   "y": 164,
//   "offsetX": 1436,
//   "offsetY": 57,
//   "movementX": 0,
//   "movementY": 0,
//   "fromElement": null,
//   "toElement": null,
//   "layerX": 1611,
//   "layerY": 203,
//   "view": "Window",
//   "detail": 1,
//   "sourceCapabilities": {},
//   "which": 1,
//   "type": "click",
//   "target": "Node",
//   "currentTarget": "Window",
//   "eventPhase": 3,
//   "bubbles": true,
//   "cancelable": true,
//   "defaultPrevented": false,
//   "composed": true,
//   "timeStamp": 7840245.599999964,
//   "srcElement": "Node",
//   "returnValue": true,
//   "cancelBubble": false,
//   "NONE": 0,
//   "CAPTURING_PHASE": 1,
//   "AT_TARGET": 2,
//   "BUBBLING_PHASE": 3,
//  }

//  const ttt2 = {
//   "isTrusted": true,
//   "pointerId": 1,
//   "width": 1,
//   "height": 1,
//   "pressure": 0,
//   "tiltX": 0,
//   "tiltY": 0,
//   "azimuthAngle": 0,
//   "altitudeAngle": 1.5707963267948966,
//   "tangentialPressure": 0,
//   "twist": 0,
//   "pointerType": "mouse",
//   "isPrimary": false,
//   "screenX": 1656,
//   "screenY": 275,
//   "clientX": 1656,
//   "clientY": 171,
//   "ctrlKey": false,
//   "shiftKey": false,
//   "altKey": false,
//   "metaKey": false,
//   "button": 0,
//   "buttons": 0,
//   "relatedTarget": null,
//   "pageX": 1656,
//   "pageY": 210,
//   "x": 1656,
//   "y": 171,
//   "offsetX": 1656,
//   "offsetY": 161,
//   "movementX": 0,
//   "movementY": 0,
//   "fromElement": null,
//   "toElement": null,
//   "layerX": 1656,
//   "layerY": 210,
//   "view": "Window",
//   "detail": 1,
//   "sourceCapabilities": {},
//   "which": 1,
//   "type": "click",
//   "target": "Node",
//   "currentTarget": "Window",
//   "eventPhase": 3,
//   "bubbles": true,
//   "cancelable": true,
//   "defaultPrevented": false,
//   "composed": true,
//   "timeStamp": 7925434.899999976,
//   "srcElement": "Node",
//   "returnValue": true,
//   "cancelBubble": false,
//   "NONE": 0,
//   "CAPTURING_PHASE": 1,
//   "AT_TARGET": 2,
//   "BUBBLING_PHASE": 3,
//  }

//  diff(tt1, ttt2);
//  console.log(tt1)