const chalk = require("chalk");
const { formatDuration, intervalToDuration } = require("date-fns");

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

const logExecTime = (ms, fnName) => {
  const durationObject = intervalToDuration({ start: 0, end: ms });
  const formattedDuration = formatDuration(durationObject);

  switch (true) {
    case ms >= 0 && ms < 500: {
      console.log(
        `${fnName}: `,
        chalk.green.bold(formattedDuration || `${ms}ms`)
      );
      break;
    }

    case ms >= 500 && ms < 3000: {
      console.log(
        `${fnName}: `,
        chalk.yellow.bold(formattedDuration || `${ms}ms`)
      );
      break;
    }

    case ms >= 3000 && ms < 10000: {
      console.log(
        `${fnName}: `,
        chalk.red.bold(formattedDuration || `${ms}ms`)
      );
      break;
    }

    case ms >= 10000: {
      console.log(
        `${fnName}: `,
        chalk.magenta.bold(formattedDuration || `${ms}ms`)
      );
      break;
    }

    default: {
      console.log(`${fnName}: ${ms}ms`);
      break;
    }
  }
};

const withTimeMeasureSync =
  (fn) =>
  (...args) => {
    try {
      const startTs = performance.now();
      const result = fn.apply(null, args);
      const finishTs = performance.now();
      const ms = +(finishTs - startTs).toFixed(2);
      logExecTime(ms, fn.name);
      return result;
    } catch (err) {
      console.error(fn, err);
    }
  };

const withTimeMeasureAsync =
  (fn) =>
  async (...args) => {
    try {
      const startTs = performance.now();
      const result = await fn.apply(null, args);
      const finishTs = performance.now();
      const ms = +(finishTs - startTs).toFixed(2);
      logExecTime(ms, fn.name);
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
