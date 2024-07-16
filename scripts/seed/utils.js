function arraysAreSame(arr1, arr2) {
  if (arr1.length !== arr2.length) {
    return false;
  }

  let sortedArr1 = arr1.slice().sort();
  let sortedArr2 = arr2.slice().sort();

  let strArr1 = JSON.stringify(sortedArr1);
  let strArr2 = JSON.stringify(sortedArr2);

  return strArr1 === strArr2;
}

const millisecondsToSeconds = (ms) => ms / 1000;

const sanitazeSqlString = (str) => str.replaceAll("'", "");

const withTimeMeasureSync =
  (fn) =>
  (...args) => {
    try {
      console.time(fn.name);
      const result = fn.apply(null, args);
      console.timeEnd(fn.name);
      return result;
    } catch (err) {
      console.error(fn, err);
    }
  };

const withTimeMeasureAsync =
  (fn) =>
  async (...args) => {
    try {
      console.time(fn.name);
      const result = await fn.apply(null, args);
      console.timeEnd(fn.name);
      return result;
    } catch (err) {
      console.error(fn, err);
    }
  };

module.exports = {
  arraysAreSame,
  millisecondsToSeconds,
  sanitazeSqlString,
  withTimeMeasureSync,
  withTimeMeasureAsync,
};
