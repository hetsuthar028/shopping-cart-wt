const { default: axios } = require('axios');
const express = require('express');
const UserSchema = require('../user/model/user.model');
const userRouter = express.Router();
const jwt = require('jsonwebtoken');

// Controllers
const userController = require('../user/controller/user.controller');

userRouter.get('/', (req, res) => {
    console.log("Got user home request");
    res.send({message: "Hello"});
});

userRouter.post('/auth/login', userController.authLogin);

userRouter.post('/auth/signup', userController.authSignUp);

userRouter.get('/auth/verify/', userController.authVerify);

userRouter.get('/get/id/:email', userController.getUseByEmail);

userRouter.get('/get/all', userController.getAllUser);

userRouter.put('/update/:email', userController.updateUser);

userRouter.delete('/delete/:email', userController.deleteUser);

module.exports = userRouter;