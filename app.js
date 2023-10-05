const express = require("express");
const expressError = require("./expressError");
const app = express();
const ExpressError = require("./expressError");
const itemsRoutes = require("./itemRoutes");

app.use(express.json());

app.use("/items", itemsRoutes);

app.use(function (req, res) {
  throw new ExpressError("Not Found", 404);
});

app.use(function (err, req, res, next) {
  let status = err.status || 500;
  return res.status(status).json({
    error: {
      msg: err.msg,
      status: status,
    },
  });
});

module.exports = app;
