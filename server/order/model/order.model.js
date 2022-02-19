const mongoose = require('mongoose');

// Add Tax and Charges with the order details
// Make a seperate collection for such charges that can vary in future

const OrderSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true,
    },
    timestamp: {
        type: Date,
        required: true,
    },
    products: {
        type: Array,
        required: true,
    },
    totalAmount: {
        type: Number,
        required: true,
    },
    address: {
        type: String,
        required: true,
    },
    contact: {
        type: Number,
        required: true,
    }
});

module.exports = mongoose.model("orders", OrderSchema);