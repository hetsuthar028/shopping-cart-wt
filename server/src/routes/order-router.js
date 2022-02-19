require('dotenv').config();
const express = require('express');
const orderController = require('../order/controller/order.controller');

const orderRouter = express.Router();

orderRouter.post('/purchase', orderController.purchase);
orderRouter.get('/get/id/:userId', orderController.getMyOrders);

module.exports = orderRouter;