export function getQueryVariable() {
  const vars = window.location.search.substring(1).split('&');
  const params = {};
  for (let i = 0; i < vars.length; i++) {
    const pair = vars[i].split('=');
    params[pair[0]] = pair[1];
  }
  return params;
}

export function saveDataToFile(data, filename) {
  const blobUrl = window.URL.createObjectURL(new Blob([ data ]));
  const aElement = document.createElement('a');
  document.body.appendChild(aElement);
  aElement.style.display = 'none';
  aElement.href = blobUrl;
  aElement.download = filename;
  aElement.click();
  document.body.removeChild(aElement);
}

export function mix(target, source) {
  for (const key in source) {
    if (source.hasOwnProperty(key)) {
      target[key] = source[key];
    }
  }
  return target;
}
export function deepCopy(source) {
  const set = new Set();
  try {
    return walkCopy(source, set);
  } catch (e) {
    return;
  }
}
function walkCopy(source, indexSet) {
  let result = source;
  if (!source) {
    return source;
  }
  if (typeof (source) === 'object') {
    if (indexSet.has(source)) {
      throw { name: 'circleDetected', message: 'object to stable array failed please check circle' };
    } else {
      indexSet.add(source);
    }
    if (Array.isArray(source)) {
      result = [];
      for (const item of source) {
        result.push(walkCopy(item, indexSet));
      }
    } else {
      result = {};
      for (const key of Object.keys(source)) {
        result[key] = walkCopy(source[key], indexSet);
      }
    }
  }
  return result;
}

export function deepCompare(source, target, mode) {
  const set = new Set();
  try {
    // target contains source
    if (mode === 0) {
      return walkCompare(source, target, set);
    }
    // source contains target
    if (mode === 1) {
      return walkCompare(target, source, set);
    }
    // strict equal
    if (mode === 2) {
      return walkCompare(source, target, set) && walkCompare(target, source, set);
    }
  } catch (e) {
    console.log(e);
    return false;
  }
}
function walkCompare(source, target, set) {
  const sType = typeof (source);
  const tType = typeof (target);
  if (sType !== tType) {
    return false;
  }
  if (!(source || target)) {
    return source === target;
  }
  // eslint-disable-next-line no-bitwise
  if (Array.isArray(source) ^ Array.isArray(target)) {
    return false;
  }
  if (typeof (source) === 'object') {
    if (set.has(source)) {
      throw { name: 'circleDetected', message: 'object to stable array failed please check circle' };
    } else {
      set.add(source);
    }
    if (Array.isArray(source)) {
      if (source.length !== target.length) {
        return false;
      }
      for (let i = 0; i < source.length; i++) {
        if (!walkCompare(source[i], target[i], set)) {
          return false;
        }
      }
      return true;
    }
    for (const key of Object.keys(source)) {
      if (!walkCompare(source[key], target[key], set)) {
        return false;
      }
    }
    return true;

  }
  return source === target;
}
