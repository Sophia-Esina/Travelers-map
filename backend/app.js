require("dotenv").config();

const path = require("path");
const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const routes = require("./routes");

const port = 5000;
const app = express();

app.use(express.static(path.resolve(__dirname, "../frontend/build")));

app.use(cookieParser());
app.use(express.json());
app.use("/api", routes);

app.get("/*splat", (req, res) => {
  res.sendFile(path.resolve(__dirname, "../frontend/build/index.html"));
});

mongoose.connect(process.env.DB_CONNECTION_STRING).then(() => {
  app.listen(port, () => {
    console.log(`Server started on port ${port}`);
  });
});
