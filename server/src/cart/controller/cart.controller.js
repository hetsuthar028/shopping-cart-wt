const CartSchema = require("../model/cart.model");
const axios = require("axios");

exports.addItem = (req, res) => {
    let { productId, userId, buyQuantity } = req.body;
    
    if (productId && userId && buyQuantity) {
        // Check if the userId and productId exists before adding to cart
        let newCartItem = new CartSchema({
            productId,
            userId,
            buyQuantity,
            timestamp: new Date(),
        });

        CartSchema.exists({
            userId: userId,
            productId: productId,
        })
            .then((existsResp) => {
                console.log("Exists", existsResp);
                if (existsResp === null) {
                    newCartItem
                        .save()
                        .then((saveResp) => {
                            return res.send({
                                success: true,
                                result: saveResp,
                            });
                        })
                        .catch((err) => {
                            return res.send({
                                success: false,
                                message: "Please try again!",
                            });
                        });
                } else {
                    return res
                        .status(400)
                        .send({ success: false, message: "Already added!" });
                }
            })
            .catch((err) => {
                console.log(err.response);
            });
    } else {
        return res.send({ success: false, message: "Invalid data" });
    }
};

exports.getCartItemsByUserId = (req, res) => {
    let userId = req.params.userId;
    
    if (userId) {
        CartSchema.find({ userId: userId })
            .then((findResult) => {
                return res.send({ success: true, cartItems: findResult });
            })
            .catch((findErr) => {
                return res.send({
                    success: false,
                    message: "Please try again!",
                });
            });
    } else {
        return res.send({ success: false, message: "Invalid data" });
    }
};

exports.deleteItemById = (req, res) => {
    let cartItemId = req.params.itemId;
    
    if (cartItemId) {
        CartSchema.findByIdAndDelete(cartItemId)
            .then((findResult) => {
                return res.send({ success: true, result: findResult });
            })
            .catch((findErr) => {
                return res.send({
                    success: false,
                    message: "Pleas try again!",
                });
            });
    } else {
        return res.send({ success: false, message: "Invalid data" });
    }
};

exports.emptyCart = (req, res) => {
    let userId = req.params.userId;
    
    if (userId) {
        CartSchema.deleteMany({ userId: userId })
            .then((deleteResp) => {
                return res
                    .status(200)
                    .send({ success: true, result: deleteResp });
            })
            .catch((err) => {
                return res
                    .status(500)
                    .send({ success: false, message: "Please try again!" });
            });
    } else {
        return res
            .status(400)
            .send({ success: false, message: "Invalid data" });
    }
};

exports.updateQuantity = (req, res) => {
    const cartId = req.params.cartId;
    const buyQuantity = req.body.buyQuantity;

    if (cartId && buyQuantity > 0) {
        CartSchema.updateOne(
            {
                _id: cartId,
            },
            { $set: { buyQuantity: buyQuantity } }
        )
            .then((updateOneResp) => {
                return res
                    .status(200)
                    .send({ success: true, result: updateOneResp });
            })
            .catch((err) => {
                return res
                    .status(500)
                    .send({ success: false, message: "Please try again!" });
            });
    } else {
        return res
            .status(400)
            .send({ success: false, message: "Invalid data" });
    }
};
