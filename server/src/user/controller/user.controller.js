require("dotenv").config();
const axios = require("axios");
const UserSchema = require("../model/user.model");
const jwt = require("jsonwebtoken");

exports.authSignUp = (req, res) => {
    let {
        email,
        password,
        username,
        status = true,
        isAdmin = false,
    } = req.body;

    if (email && username && password) {
        UserSchema.exists({ email: email })
            .then((userExistsResult) => {
                if (userExistsResult === null) {
                    let newUser = new UserSchema({
                        email,
                        password,
                        username,
                        status,
                        isAdmin,
                    });
                    newUser
                        .save()
                        .then((userSave) => {
                            return res.send({
                                success: true,
                                message: "User created successfully!",
                            });
                        })
                        .catch((userSaveErr) => {
                            console.log(userSaveErr);
                            return res.send({
                                success: false,
                                message: "Please try again",
                            });
                        });
                } else {
                    console.log("User already exists");
                    return res.send({
                        success: false,
                        message: "User already exists!",
                    });
                }
            })
            .catch((err) => {
                console.log("User does not exists 2");
                return res.send({ success: false, message: "Invalid data" });
            });
    } else {
        return res.send({ success: false, message: "Invalid data" });
    }
};

exports.authLogin = (req, res) => {
    let { email, password } = req.body;

    if (email && password) {
        axios
            .get(`http://localhost:8080/user/get/id/${email}`)
            .then((userResult) => {
                console.log(userResult.data.user?.password)
                if (password === userResult.data.user?.password) {
                    let user = userResult.data.user;
                    let userToken = jwt.sign(
                        {
                            email: user.email,
                            status: user.status,
                            isAdmin: user.isAdmin,
                        },
                        process.env.JWT_SECRET,
                        {
                            expiresIn: 60*1
                        }
                    );

                    return res.send({ success: true, token: userToken });
                } else {
                    return res.send({
                        success: false,
                        message: "Invalid credentials",
                    });
                }
            })
            .catch((err) => {
                console.log("Error in fetching user @authLogin", err);
                return res.send({
                    success: false,
                    message: "Invalid credentials",
                });
            });
    } else {
        return res.send({ success: false, message: "Invalid data" });
    }
};

exports.authVerify = (req, res) => {
    try {
        jwt.verify(req.headers.authorization, process.env.JWT_SECRET);
        return res.send({ success: true, message: "verified" });
    } catch (e) {
        console.log("Invalid")
        return res.send({ success: false, message: "not verified" });
    }
};

exports.getUseByEmail = (req, res) => {
    UserSchema.findOne({ email: req.params.email })
        .then((findResult) => {
            return res.send({ success: true, user: findResult });
        })
        .catch((err) => {
            return res.send({ success: false });
        });
};

exports.getAllUser = (req, res) => {
    UserSchema.find({})
        .then((findResult) => {
            return res.send({success: true, users: findResult});
        })
        .catch((err) => {
            return res.send({success: false});
        })
}

exports.updateUser = (req, res) => {
    if(req.params.email && Object.keys(req.body).length){
        UserSchema.updateOne({email: req.params.email}, {$set: req.body})
            .then((updateResult) => {
                return res.send({success: true, result: updateResult});
            }).catch((updateError) => {
                return res.send({success: false, message: "Please try again!"});
            })
    } else {
        return res.send({success: false, message: "Invalid data"});
    }
}

exports.deleteUser = (req, res) => {
    if(req.params.email){
        UserSchema.deleteOne({email: req.params.email})
            .then((deleteResult) => {
                return res.send({success: true, result: deleteResult});
            })
            .catch((deleteErr) => {
                return res.send({success: false, message: "Please try again!"});
            })
    } else {
        return res.send({success: false, message: "Invalid data"});
    }
}