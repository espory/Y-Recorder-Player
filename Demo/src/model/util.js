export function isNil(obj) {
  return obj === undefined || obj === null;
}

export function isEmptyArray(arr) {
  return isNil(arr) || arr.length === 0;
}

export function strToNum(str) {
  if (typeof str === 'number') {
    return str;
  }
  if (typeof str === 'string') {
    const num = Number(str);
    if (isNaN(num)) {
      throw new Error(`${str} cannot convert to Number`);
    }
    return num;
  }
  throw new Error(`${str} is not String`);

}
