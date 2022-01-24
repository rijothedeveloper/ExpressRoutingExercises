const express = require("express");
const MyAppError = require("./appError");
const stat = require("./stat");

const app = express();

app.get("/mean", (req, res) => {
  const numStr = req.query.nums;
  if (!numStr) {
    throw new MyAppError("input required", 400);
  }
  const nums = numStr.split(",");
  const mean = stat.calculateMean(nums);
  if (isNaN(mean)) {
    throw new MyAppError("invalid input ", 400);
  }

  const response = createResponse("mean", mean);
  return res.json(response);
});

app.get("/median", function (req, res) {
  const numStr = req.query.nums;
  if (!numStr) {
    throw new MyAppError("input required", 400);
  }
  const nums = numStr.split(",");
  const median = stat.calculateMedian(nums);
  if (median.status) {
    throw median;
  }
  const response = createResponse("median", median);
  return res.json(response);
});

app.get("/mode", (req, res) => {
  const numStr = req.query.nums;
  if (!numStr) {
    throw new MyAppError("input required", 400);
  }
  const nums = numStr.split(",");
  const mode = calculateMode(nums);
  const response = createResponse("mode", mode);
  return res.json(response);
});

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
      throw new MyAppError("invalid input ", 400);
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
      throw new MyAppError("invalid input ", 400);
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

function createResponse(operation, value) {
  const response = {};
  response.operation = operation;
  response.value = value;
  return response;
}

app.use(function (error, req, res, next) {
  const message = error.message;
  const status = error.status;
  return res.status(status).json({
    error: { message, status },
  });
});

app.listen(3000, function () {
  console.log("App on port 3000");
});
