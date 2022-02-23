const { default: axios } = require("axios");
const OrderSchema = require("../model/order.model");

exports.purchase = (req, res) => {
    let { userId, products, totalAmount, address, contact } = req.body;
    if (
        userId &&
        products.length != 0 &&
        parseFloat(totalAmount) > 0 &&
        address &&
        contact.toString().length == 10
    ) {
        let newOrder = new OrderSchema({
            userId,
            timestamp: new Date(),
            products,
            totalAmount: parseFloat(totalAmount),
            address,
            contact: parseInt(contact),
        });

        console.log("Products", products);

        newOrder.save()
            .then((saveResult) => {
                console.log("AUTH HEADER", req.headers.authorization)
                axios.delete(`http://localhost:8080/cart/emptycart/${userId}`, {
                    headers: {
                        authorization: req.headers.authorization,
                    }
                })
                    .then((deleteResp) => {
                        return res.send({success: true, result: saveResult, message: "Order successful!"});
                    })
                    .catch((deleteErr) => {
                        console.log(deleteErr.response.data);
                        return res.status(400).send({success: false, message: "Some error occured!"});
                    })
                
            })
            .catch((saveErr) => {
                return res.send({success: false, message: "Please try again!"});
            })

    } else {
        return res.send({ success: false, message: "Invalid data" });
    }
};


exports.getMyOrders = (req, res) => {
    let userId = req.params.userId;
    if(userId){
        OrderSchema.find({userId: userId})
            .then((findResult) => {
                return res.send({success: true, orders: findResult});
            })
            .catch((findErr) => {
                return res.send({success: false, message: "Please try again!"});
            })
    } else {
        return res.send({success: false, message: "Invalid data"});
    }
} 