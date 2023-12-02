const express = require("express");
const app = express();
const port = process.env.HOST_PORT || 3030;
const cors = require("cors");
const bodyParser = require("body-parser");
const payuRoutes = require("./routes/payuRoutes");
require("dotenv").config();
app.use(express.json());
app.use(cors());
// parse json and url encoded formdata
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/api/payu", payuRoutes);
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
