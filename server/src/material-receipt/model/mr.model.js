const mongoose = require("mongoose");

const MRSchema = new mongoose.Schema({
    mrDate: {
        type: Date,
        required: true,
    },
    mrNo: {
        type: String,
        required: true,
    },
    supplier: {
        type: String,
        required: true,
    },
    products: [
        {
            productId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "products",
            },
            quantity: {
                type: Number,
                required: true,
            },
            rate: {
                type: Number,
                required: true,
            },
            totalAmt: {
                type: Number,
                required: true
            }
        },
    ],
    totalAmount: {
        type: Number,
        required: true,
    }
});

module.exports = mongoose.model("materialreceipts", MRSchema);
