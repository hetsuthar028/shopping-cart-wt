const mongoose = require("mongoose");

const CartSchema = new mongoose.Schema({
    productId: {
        type: String,
        required: true,
    },
    userId: {
        type: String,
        required: true,
    },
    timestamp: {
        type: Date,
        required: true,
    },
});

module.exports = mongoose.model("cartItems", CartSchema);
