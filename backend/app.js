const express= require("express");
const app = express();

const productRoute = require("./routes/productRoute");

app.use("/api/product", productRoute);

module.exports = app;





