const ProductSchema = require('../model/product.model');

exports.getAll = (req, res) => {
    ProductSchema.find({})
        .then((findResult) => {
            return res.send({success: true, products: findResult});
        })
        .catch((findErr) => {
            return res.send({success: false, message: "Please try again!"});
        })
};

exports.getProductById = (req, res) => {
    let productId = req.params.productId;
    if(productId){
        ProductSchema.findById(productId)
            .then((findResult) => {
                return res.send({success: true, product: findResult});
            })
            .catch((findErr) => {
                return res.send({success: false, message: "Invalid product id!"});
            })
    } else {
        return res.send({success: false, message: "Invalid data"});
    }
}

exports.addProduct = (req, res) => {
    let {productName, productDescription, productPrice, productQuantity, productStatus} = req.body;
    if(productName && parseFloat(productPrice) > 0 && parseInt(productQuantity) > 0){
        let newProduct = new ProductSchema({name: productName, description: productDescription, price: productPrice, status: productStatus, quantity: productQuantity})
        newProduct.save().then((saveResult) => {
            return res.send({success: true, result: saveResult});
        }).catch((saveErr) => {
            return res.send({success: false, message: "Please try again!"});
        })
    } else {
        return res.send({success: false, message: "Invalid data"});
    }
}

exports.updateProduct = (req, res) => {
    let productId = req.params.productId;
    let toUpdateFields = req.body;
    if(productId && Object.keys(toUpdateFields).length !=0){
        ProductSchema.updateOne({_id: productId}, {$set: toUpdateFields})
            .then((updateResult) => {
                return res.send({success: true, result: updateResult});
            })
            .catch((updateErr) => {
                return res.send({success: false, error: updateErr});
            })
    } else {
        return res.send({success: false, message: "Invalid data"});
    }
}

exports.deleteProdct = (req, res) => {
    let productId = req.params.productId;

    if(productId){
        ProductSchema.deleteOne({_id: productId})
            .then((deleteResult) => {
                return res.send({success: true, result: deleteResult});
            })
            .catch((deleteErr) => {
                return res.send({success: false, message: "Please try again!"});
            })
    } else {
        return res.send({success: false, message: "Invalid product id"});
    }
}