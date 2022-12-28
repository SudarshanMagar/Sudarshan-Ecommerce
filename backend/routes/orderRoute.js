const express = require("express");
const { createOrder, updateStatus, getAllOrders, getMyOrders, getOrder, deleteOrders,  } = require("../controller/orderController");
const router = express.Router();

const {isAuthenticated, authorizedRole,} = require("../middleware/auth");


router.route("/").post(isAuthenticated,createOrder);
router.route("/update").put(isAuthenticated, authorizedRole("admin"),updateStatus);
router.route("/get").get(isAuthenticated, authorizedRole("admin"),getAllOrders);
router.route("/myorder").get(isAuthenticated, authorizedRole("admin"),getMyOrders);
router.route("/getOrder").get(isAuthenticated, authorizedRole("admin"),getOrder);
router.route("/remove/:id").delete(isAuthenticated, authorizedRole("admin"),deleteOrders);




module.exports = router;