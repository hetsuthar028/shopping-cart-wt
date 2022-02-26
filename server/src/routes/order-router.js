require("dotenv").config();
const express = require("express");
const orderController = require("../order/controller/order.controller");
const authMiddleware = require("../middlewares/index");
const orderRouter = express.Router();

orderRouter.post(
    "/purchase",
    authMiddleware.isLoggedIn,
    orderController.purchase
);

orderRouter.get(
    "/get/id/:userId",
    authMiddleware.isLoggedIn,
    orderController.getMyOrders
);

orderRouter.get(
    "/get/all",
    authMiddleware.isLoggedIn,
    authMiddleware.isAdmin,
    orderController.getAllOrders
);

module.exports = orderRouter;
