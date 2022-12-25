const express= require("express");
const app = express();
app.use(express.json());


const productRoute = require("./routes/productRoute");
app.use("/api/product", productRoute);

const userRoute = require("./routes/userRoute");
app.use("/api/user", userRoute);


module.exports = app;

