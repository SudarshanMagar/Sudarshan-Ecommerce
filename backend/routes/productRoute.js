const express = require("express");
const router = express.Router();
const {
  addProduct,
  getAllProduct,
  updateProduct,
  removeProduct,
  addProductReview,
  getAllReviews,
} = require("../controller/productController");
const {isAuthenticated, authorizedRole} = require("../middleware/auth");

router.route("/").post(isAuthenticated , authorizedRole("admin"), addProduct);
router.route("/").get(isAuthenticated, getAllProduct);
router.route("/:id").put(updateProduct);
router.route("/:id").delete(removeProduct);
router.route("/review/add").put(isAuthenticated, addProductReview);
router.route("/review/get/:id").get(getAllReviews);



module.exports = router;
