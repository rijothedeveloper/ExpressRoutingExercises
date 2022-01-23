const { response } = require("express");
const express = require("express");

const app = express();

app.get("/mean", (req, res) => {
  const numStr = req.query.nums;
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

app.listen(3000, function () {
  console.log("App on port 3000");
});
