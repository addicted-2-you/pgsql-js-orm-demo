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

module.exports = {
  arraysAreSame,
  millisecondsToSeconds,
  sanitazeSqlString,
};
