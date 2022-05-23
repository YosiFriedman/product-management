const express = require("express");
const mongoose = require("mongoose");

const bodyParser = require("body-parser");
const cors = require("cors");
require("dotenv").config();
const { readdirSync } = require("fs");

//app
const app = express();

//DB
const connection_url = process.env.ATLAS_URI;
mongoose.connect(connection_url, {useNewUrlParser: true,});

const db = mongoose.connection;
db.once("open", () => {
  console.log("db conected successfully");
});

//middlewares
app.use(bodyParser.json({ limit: "2mb" }));
app.use(cors());

//routes
readdirSync("./routes").map((r) => app.use("/api", require("./routes/" + r)));

//listen
const port = process.env.PORT || 8000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
