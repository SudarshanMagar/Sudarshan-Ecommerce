const express = require("express");
const router = express.Router();
const { addProduct } = require("../controller/productController");



router.route("/product").post(addProduct);

module.exports = router;
