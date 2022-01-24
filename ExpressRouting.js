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
  const mode = stat.calculateMode(nums);
  if (mode.status) {
    throw mode;
  }
  const response = createResponse("mode", mode);
  return res.json(response);
});

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
