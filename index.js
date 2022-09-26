const express = require("express");
const cors = require("cors");
require("dotenv").config();
const app = express();
const port = process.env.PORT || 5000;
const errorHandler = require("./middleware/errorHandler");
const userRoutes = require("./routes/user.route");

// Middleware
app.use(cors());
app.use(express.json());

//Data serving api
app.use("/user", userRoutes);

/**
 * @api {get} / Server Testing
 * @apiDescription Testing the server is running or not
 * @apiPermission all
 */
app.get("/", (req, res) => {
  res.send("Random user API server running");
});

/**
 * @api {all} which router is not found
 * @apiDescription API for which route not valid
 * @apiPermission all
 */

app.all("*", (req, res) => {
  res.send("Requested Route Not Found");
});

app.listen(port, () => {
  console.log(`Random user API server running on ${port} port`);
});

// Handle error || close app
app.use(errorHandler);

process.on("unhandledRejection", (error) => {
  console.log(error.name, error.message);
  app.close(() => {
    process.exit(1);
  });
});
