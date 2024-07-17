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

function compareObjects(obj1, obj2) {
  // Get the keys of both objects
  const keys1 = Object.keys(obj1);
  const keys2 = Object.keys(obj2);

  // Check if the lengths of the keys arrays are different
  if (keys1.length !== keys2.length) {
    return false;
  }

  // Create sets from the keys arrays to make comparison easier
  const set1 = new Set(keys1);
  const set2 = new Set(keys2);

  // Compare the sets
  for (let key of set1) {
    if (!set2.has(key)) {
      return false;
    }
  }

  return true;
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
  compareObjects,
  millisecondsToSeconds,
  sanitazeSqlString,
  withTimeMeasureSync,
  withTimeMeasureAsync,
};
