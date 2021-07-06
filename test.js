function reduce(index,callBack) {
  let arr = Array.prototype.map(n => {
    callBack(n)
  })
  return arr;
}