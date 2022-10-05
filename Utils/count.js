function stringifyEvent(e) {
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


  function diff(obj, base, hash = new WeakMap()) {
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
  
const events = [];
const events_diff = {};

['click','mouseup','mousepress','mousemove','keyup','keydown','keypress','dragover','dragenter','dragleave'].forEach(type => {
    events_diff[type]=[]
    window.addEventListener(type,(e)=>{
        const s = stringifyEvent(e)
        events.push(s)
        if(!events_diff[type].length){
            events_diff[type].push(s)
        }else{
            const t = JSON.parse(s);
            const init = JSON.parse(events_diff[type][0])
            diff(t,init)
            if('path' in t)delete t['path']
            if('sourceCapabilities' in t)delete t['sourceCapabilities']
            events_diff[type].push(JSON.stringify(t));
        }
    })
});

function downloadFileByBlob(blob, fileName = "file") {
    let blobUrl = window.URL.createObjectURL(blob)
    let link = document.createElement('a')
    link.download = fileName || 'defaultName'
    link.style.display = 'none'
    link.href = blobUrl
    // 触发点击
    document.body.appendChild(link)
    link.click()
    // 移除
    document.body.removeChild(link)
  }