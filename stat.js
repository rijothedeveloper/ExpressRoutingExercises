const MyAppError = require("./appError");

function calculateMean(nums) {
  let total = 0;
  for (let num of nums) {
    no = parseInt(num);
    total += no;
  }
  return total / nums.length;
}

function calculateMedian(nums) {
  for (let num of nums) {
    if (isNaN(num)) {
      return new MyAppError("invalid input ", 400);
    }
  }
  nums.sort();
  let middle = nums[parseInt(nums.length / 2)];
  return middle;
}

function calculateMode(nums) {
  const map = new Map();
  for (let num of nums) {
    if (isNaN(num)) {
      return new MyAppError("invalid input ", 400);
    }
    if (map.has(num)) {
      map.set(num, map.get(num) + 1);
    } else {
      map.set(num, 1);
    }
  }
  let max = 0;
  let maxKey;
  for (const [key, value] of map.entries()) {
    if (value > max) {
      maxKey = key;
      max = value;
    }
  }
  return maxKey;
}

module.exports = {
  calculateMean,
  calculateMedian,
  calculateMode,
};
