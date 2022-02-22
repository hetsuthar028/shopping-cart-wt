const MRSchema = require('../model/mr.model');

exports.generate = (req, res) => {
    let {mrDate, mrNo, supplier, products } = req.body;
    if(mrDate && mrNo && supplier && products.length !=0){
        const newMR = new MRSchema({
            mrDate,
            mrNo,
            supplier,
            products
        })

        newMR.save()
            .then((saveResult) => {
                return res.status(201).send({success: true, result: saveResult})
            })
            .catch((saveErr) => {
                return res.status(500).send({success: false, message: "Please try again!"});
            })
    } else {
        return res.status(400).send({success: false, message: "Invalid data"});
    }
}

exports.getAll = (req, res) => {
    MRSchema.find({})
        .then((findResp) => {
            return res.status(200).send({success: true, result: findResp});
        })
        .catch((err) => {
            return res.status(500).send({success: false, message: "Please try again!"});
        })
}

exports.getByNumber = (req, res) => {
    let mrNo = req.params.mrNo;
    if(mrNo){
        MRSchema.findOne({"mrNo": mrNo})
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