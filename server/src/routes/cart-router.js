const express = require("express");
const cartRouter = express.Router();
const cartController = require("../cart/controller/cart.controller");

cartRouter.post("/add/item", cartController.addItem);
cartRouter.get("/get/items/:userId", cartController.getCartItemsByUserId);
cartRouter.delete("/delete/item/:itemId", cartController.deleteItemById);

module.exports = cartRouter;
