const express = require('express');
const mrRouter = express.Router();
const authMiddleware = require('../middlewares/index');

const mrController = require('../material-receipt/controller/mr.controller');

mrRouter.post('/generate', authMiddleware.isLoggedIn, authMiddleware.isAdmin, mrController.generate);
mrRouter.get('/get/all', authMiddleware.isLoggedIn, authMiddleware.isAdmin, mrController.getAll);
mrRouter.get('/get/id/:mrNo', authMiddleware.isLoggedIn, authMiddleware.isAdmin, mrController.getByNumber);
mrRouter.delete('/delete/id/:mrNo', authMiddleware.isLoggedIn, authMiddleware.isAdmin, mrController.deleteByNumber);

module.exports = mrRouter;