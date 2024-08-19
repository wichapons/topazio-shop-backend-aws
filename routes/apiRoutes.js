const express = require("express");
const app = express();
const productRoutes = require("./productRoutes");
const categoryRoutes = require("./categoryRoutes");
const userRoutes = require("./userRoutes");
const orderRoutes = require("./orderRoutes");
const verifyAccessToken = require("../utils/verifyAccessToken");
const { initializeLaunchDarkly, getCurrentFlagStatus } = require("../middlewares/launchDarklyMiddleware");

// Use LaunchDarkly initialization middleware
app.use(initializeLaunchDarkly);

app.get("/get-token", (req, res) => {
  verifyAccessToken(req, res);
});

app.get("/logout", (req, res) => {
  return res.clearCookie("access_token").send("Access token cleared");
});

app.get("/health", (req, res) => {
  const currentFlagStatus = getCurrentFlagStatus();
  if (currentFlagStatus) {
    return res.status(503).json({ message: "API is disabled" });
  } else {
    return res.status(200).json({ message: "API is working" });
  }
});

app.use("/products", productRoutes);
app.use("/categories", categoryRoutes);
app.use("/users", userRoutes);
app.use("/orders", orderRoutes);

module.exports = app;
