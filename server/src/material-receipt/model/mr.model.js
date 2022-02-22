const mongoose = require('mongoose');

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
    products: {
        type: Array,
        required: true,
    },
});

module.exports = mongoose.model("materialreceipts", MRSchema);