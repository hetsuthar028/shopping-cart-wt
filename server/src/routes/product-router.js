require('dotenv').config();
const express = require('express');
const productRouter = express.Router();
const productController = require('../product/controller/product.controller');

productRouter.get('/get/all', productController.getAll);
productRouter.post('/add', productController.addProduct);
productRouter.get('/get/id/:productId', productController.getProductById);
productRouter.put('/update/id/:productId', productController.updateProduct);
productRouter.delete('/delete/id/:productId', productController.deleteProdct);

module.exports = productRouter;