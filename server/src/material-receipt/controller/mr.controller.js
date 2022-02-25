const { path } = require('express/lib/application');
const MRSchema = require('../model/mr.model');

exports.generate = (req, res) => {
    let {mrDate, mrNo, supplier, products, totalAmount } = req.body;
    if(mrDate && mrNo && supplier && products.length !=0 && totalAmount !=0){
        const newMR = new MRSchema({
            mrDate,
            mrNo,
            supplier,
            products,
            totalAmount
        })

        console.log("Request", req.body)
        newMR.save()
            .then((saveResult) => {
                return res.status(201).send({success: true, result: saveResult})
            })
            .catch((saveErr) => {
                console.log("ERROR", saveErr);
                return res.status(500).send({success: false, message: "Please try again!"});
            })
    } else {
        return res.status(400).send({success: false, message: "Invalid data"});
    }
}

exports.getAll = (req, res) => {
    MRSchema.find().populate('products.productId').exec()
        .then((findResp) => {
            // console.log(findResp[0].products)
            return res.status(200).send({success: true, result: findResp});
        })
        .catch((err) => {
            return res.status(500).send({success: false, message: "Please try again!"});
        })
}

exports.getByNumber = (req, res) => {
    let mrNo = req.params.mrNo;
    if(mrNo){
        MRSchema.findOne({"mrNo": mrNo}).populate("products.productId").exec()
            .then((findResp) => {
                if(findResp === null){
                    return res.status(400).send({success: false, message: "Material receipt does not exists!"});
                }
                return res.status(200).send({success: true, receipt: findResp});
            })
            .catch((err) => {
                return res.status(500).send({success: false, message: "Please try again!"});
            })
    } else {
        return res.status(400).send({success: false, message: "Invalid data"});
    }
}

exports.deleteByNumber = (req, res) => {
    let mrNo = req.params.mrNo;
    if(mrNo){
        MRSchema.findOneAndDelete({"mrNo": mrNo})
            .then((deleteResp) => {
                if(deleteResp === null){
                    return res.status(400).send({success: false, message: "Material receipt does not exists!"})
                }

                return res.status(200).send({success: true, result: deleteResp});
            })
            .catch((err) => {
                return res.status(500).send({success: false, message: "Please try again!"});
            })
    } else {
        return res.status(400).send({success: false, message: "Invalid data"});
    }
}

exports.updateMr = (req, res) => {
    let mrNo = req.params.mrNo;
    let updateFields = req.body;
    console.log("Update Fields", updateFields);
    if(mrNo && Object.keys(updateFields).length !=0){
        MRSchema.updateOne({"mrNo": parseInt(mrNo)}, {
            $set: {...updateFields}
        })
        .then((updateResp) => {
            return res.status(200).send({success: true, result: updateResp});
        })
        .catch((updateErr) => {
            return res.status(500).send({success: false, message: "Please try again!"});
        })
    } else {
        return res.status(400).send({success: false, message: "Invalid data"});
    }
}

exports.getAvailableQuantities = (req, res) => {
    let productId = req.params.productId;
    if(productId){
        // MRSchema.aggregate([{$unwind: "$products"},{$match: {"productId": productId}}])
        //     .then((findResp) => {
        //         return res.send(findResp);
        //     }).catch((err) => {
        //         console.log(err);
        //     })
        // MRSchema.aggregate([ {$group: {"_id": "$products.productId"}}])
        //     .then((findResp) => {
        //         return res.send(findResp);
        //     }).catch((err) => {
        //         console.log(err);
        //     })
        MRSchema.find({"products.productId": productId}, {"products.productId": 1, "products.quantity": 1})
            .then((findResp) => {
                // console.log(findResp.products);
                // findResp.products.map((prod) => {
                //     console.log(prod);
                // })
                // console.log(findResp[0].products[0].productId == productId);
                return res.status(200).send({success: true, totalQuantities: findResp.map((mr) => {
                    return mr.products.filter((prod) => {
                        return prod.productId == productId
                    })
                    .reduce((prev, prod) => {
                        console.log(prod)
                        return prev += prod.quantity
                    }, 0);
                }).reduce((pre, next) => {
                    return pre += next;
                }, 0)});
                // findResp.map((mr) => {
                //     const something = mr.products.reduce((prev, prod) => {
                //         if(prod.productId == productId){
                //             // console.log(prod.productId == productId)
                //             return prev += prod.quantity    
                //         }
                //     }, 0);
                //     console.log(something);
                // })
                // return res.send(findResp);
            })
            .catch((err) => {
                console.log(err);
            })
    } else {
        return res.status(400).send({success: false, message: "Invalid data"});

    }
}

exports.decreaseStockOnPurchase = (req, res) => {
    let productId = req.params.productId;
    let decreaseQuantity = req.body.decreaseQuantity;

    // @Important -- Will be used in upper query
    // MRSchema.findOne({"products.productId": productId},  {"products.$": 1})
    //     .then((result) => {
    //         console.log(result)
    //     }).catch((err) => {
    //         console.log(err);
    //     })

    // Approach - 2
    [...Array(decreaseQuantity).keys()].map((qty, idx) => {
        MRSchema.findOneAndUpdate({"products.productId": productId, "products.quantity": {$gt: 0}}, {$inc: {"products.$.quantity": -1}})
        .then((updateResult) => {
            console.log("Update result", updateResult, decreaseQuantity, idx);
            if(updateResult === null){
                return res.status(400).send({success: false, message: "Product out of stock!"});
            }
            if(decreaseQuantity - 1 === idx){
                return res.send(updateResult);
            }
        })
        .catch((updateErr) => {
            console.log(updateErr);
        })
    })
    // MRSchema.updateOne({"products.productId": productId}, {$inc: {"products.$.quantity": -decreaseQuantity }})
    // .then((result) => {
    //     return res.send(result);
    // })
    // .catch((err) => {
    //     console.log(err);
    // })

    // Working
    // MRSchema.updateOne({"products.productId": productId}, {$inc: {"products.$.quantity": -decreaseQuantity }})
    //     .then((result) => {
    //         return res.send(result);
    //     })
    //     .catch((err) => {
    //         console.log(err);
    //     })

    // MRSchema.updateOne({"productId": "productId"}, )
    // MRSchema.findOne({"productId": productId}, {"products.quantity": 1, "products.productId": 1})
    //     .then((result) => {
    //         console.log(result);
    //         let something = result.products.filter((prod) => {
    //             return prod.productId == productId
    //         });
    //         if((something[0].quantity - removeQuantity) > 0){
    //             console.log("Smething")
    //             something[0].quantity = something[0].quantity - removeQuantity
    //         }
    //         console.log(something);
    //         return res.send(result)
    //     })
    //     .catch((err) => {
    //         console.log(err);
    //     })
}