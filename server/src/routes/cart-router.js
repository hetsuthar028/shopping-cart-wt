const express = require("express");
const cartRouter = express.Router();
const cartController = require("../cart/controller/cart.controller");
const authMiddleware = require('../middlewares/index');

cartRouter.post("/add/item", authMiddleware.isLoggedIn, cartController.addItem);
cartRouter.get("/get/items/:userId", authMiddleware.isLoggedIn, cartController.getCartItemsByUserId);
cartRouter.delete("/delete/item/:itemId", authMiddleware.isLoggedIn, cartController.deleteItemById);

module.exports = cartRouter;
