const CartSchema = require("../model/cart.model");
const axios = require("axios");

exports.addItem = (req, res) => {
    let { productId, userId } = req.body;
    if (productId && userId) {
        // Check if the userId and productId exists before adding to cart
        let newCartItem = new CartSchema({
            productId,
            userId,
            timestamp: new Date(),
        });

        newCartItem
            .save()
            .then((saveResp) => {
                return res.send({ success: true, result: saveResp });
            })
            .catch((err) => {
                return res.send({
                    success: false,
                    message: "Please try again!",
                });
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
