const express = require("express");
const userRouter = express.Router();
const myMiddleware = require("../middlewares/index");

// Controllers
const userController = require("../user/controller/user.controller");

userRouter.post("/auth/login", userController.authLogin);

userRouter.post("/auth/signup", userController.authSignUp);

userRouter.get("/auth/verify/", userController.authVerify);

userRouter.get("/get/id/:email", userController.getUseByEmail);

userRouter.get(
    "/get/all",
    myMiddleware.isLoggedIn,
    myMiddleware.isAdmin,
    userController.getAllUser
);

userRouter.get(
    "/get/currentuser",
    myMiddleware.isLoggedIn,
    userController.getCurrentUser
);

userRouter.put(
    "/update/:email",
    myMiddleware.isLoggedIn,
    myMiddleware.isAdmin,
    userController.updateUser
);

userRouter.delete(
    "/delete/:email",
    myMiddleware.isLoggedIn,
    myMiddleware.isAdmin,
    userController.deleteUser
);

module.exports = userRouter;
