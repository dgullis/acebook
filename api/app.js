const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const usersRouter = require("./routes/users");
const postsRouter = require("./routes/posts");
const authenticationRouter = require("./routes/authentication");
const tokenChecker = require("./middleware/tokenChecker");

const app = express();
// const fs = require('fs')

// const file = fs.readFileSync('/home/ec2-user/acebook/api/314DA824F1248BB8B24D8282B1AFD014.txt')

// Allow requests from any client
// docs: https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS
// docs: https://expressjs.com/en/resources/middleware/cors.html
app.use(cors());

// Parse JSON request bodies, made available on `req.body`
app.use(bodyParser.json());

// API Routes
app.use("/users", usersRouter);
app.use("/posts", tokenChecker, postsRouter);
app.use("/tokens", authenticationRouter);

// Test Route
app.get("/test", (req, res) => {
  res.send("<h1>!!Working!!</h1>");
});

// app.get("/.well-known/pki-validation/314DA824F1248BB8B24D8282B1AFD014.txt", (req, res) => {
// res.sendFile("/home/ec2-user/acebook/api/314DA824F1248BB8B24D8282B1AFD014.txt")
// })

// 404 Handler
app.use((_req, res) => {
  res.status(404).json({ err: "Error 404: Not Found" });
});

// Error handler
app.use((err, _req, res, _next) => {
  console.error(err);
  if (process.env.NODE_ENV === "development") {
    res.status(500).send(err.message);
  } else {
    res.status(500).json({ err: "Something went wrong" });
  }
});

module.exports = app;
