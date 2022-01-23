const express = require("express");
const MyAppError = require("./appError");

const app = express();

app.get("/mean", (req, res) => {
  const numStr = req.query.nums;
  if (!numStr) {
    err = new MyAppError("input required", 400);
    throw new MyAppError("input required", 400);
  }
  const nums = numStr.split(",");
  const mean = calculateMean(nums);
  const response = createResponse("mean", mean);
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
