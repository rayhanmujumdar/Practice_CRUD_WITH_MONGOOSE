const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const http = require("http");
const mongoose = require("mongoose").default;
const routerHandler = require("./routerHandler/todoHandler");

// express app initialization
const app = express();
const port = process.env.PORT || 4000;

// middleware
app.use(express.json());
app.use(cors());
app.use(morgan("dev"));

// application routes
app.use("/todo", routerHandler);

// not found routes error handler
const notFoundError = (_req, _res, next) => {
  const error = new Error("Route not exist");
  error.status = 404;
  next(error);
};
// default error handler
const errorHandler = (err, _req, res, next) => {
  if (res.headersSent) {
    return next(err);
  }
  res.status(500).json({ error: err.message });
};
// error handler middleware
app.use(notFoundError);
app.use(errorHandler);

// database connect and server listener
const server = http.createServer(app);
mongoose
  .connect("mongodb://localhost:27017/todos")
  .then(() => {
    server.listen(port, () => {
      console.log(`listening port is ${port}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });
