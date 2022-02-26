require("dotenv").config();
const express = require("express");
const productRouter = express.Router();
const productController = require("../product/controller/product.controller");
const authMiddlewares = require("../middlewares/index");

productRouter.get(
    "/get/all",
    authMiddlewares.isLoggedIn,
    productController.getAll
);

productRouter.post(
    "/add",
    authMiddlewares.isLoggedIn,
    authMiddlewares.isAdmin,
    productController.addProduct
);

productRouter.get(
    "/get/id/:productId",
    authMiddlewares.isLoggedIn,
    productController.getProductById
);

productRouter.put(
    "/update/id/:productId",
    authMiddlewares.isLoggedIn,
    authMiddlewares.isAdmin,
    productController.updateProduct
);

productRouter.delete(
    "/delete/id/:productId",
    authMiddlewares.isLoggedIn,
    authMiddlewares.isAdmin,
    productController.deleteProdct
);

module.exports = productRouter;
