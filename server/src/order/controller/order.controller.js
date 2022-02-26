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

        products.map((product, idx) => {
            axios
                .put(
                    `http://localhost:8080/materialreceipt/update/qty/product/id/${product.productId}`,
                    {
                        decreaseQuantity: product.buyQuantity,
                    },
                    {
                        headers: {
                            authorization: req.headers.authorization,
                        },
                    }
                )
                .then((updateResp) => {
                    if (products.length - 1 === idx) {
                        newOrder
                            .save()
                            .then((saveResult) => {
                                console.log(
                                    "AUTH HEADER",
                                    req.headers.authorization
                                );
                                axios
                                    .delete(
                                        `http://localhost:8080/cart/emptycart/${userId}`,
                                        {
                                            headers: {
                                                authorization:
                                                    req.headers.authorization,
                                            },
                                        }
                                    )
                                    .then((deleteResp) => {
                                        return res.send({
                                            success: true,
                                            result: saveResult,
                                            message: "Order successful!",
                                        });
                                    })
                                    .catch((deleteErr) => {
                                        console.log(deleteErr.response.data);
                                        return res
                                            .status(400)
                                            .send({
                                                success: false,
                                                message: "Some error occured!",
                                            });
                                    });
                            })
                            .catch((saveErr) => {
                                return res.send({
                                    success: false,
                                    message: "Please try again!",
                                });
                            });
                    }
                })
                .catch((updateErr) => {});
        });
    } else {
        return res.send({ success: false, message: "Invalid data" });
    }
};

exports.getMyOrders = (req, res) => {
    let userId = req.params.userId;
    if (userId) {
        OrderSchema.find({ userId: userId })
            .then((ordersResp) => {
                let temp2 = [];

                ordersResp.map((order, idx) => {
                    let products = [];

                    order.products.map((pds, idx2) => {
                        axios
                            .get(
                                `http://localhost:8080/product/get/id/${pds.productId}`,
                                {
                                    headers: {
                                        authorization:
                                            req.headers.authorization,
                                    },
                                }
                            )
                            .then((resp) => {
                                products.push(resp.data.product);
                                if (products.length === order.products.length) {
                                    temp2.push({ order, products: products });
                                    if (temp2.length === ordersResp.length) {
                                        return res
                                            .status(200)
                                            .send({
                                                success: true,
                                                orders: temp2,
                                            });
                                    }
                                }
                            })
                            .catch((err) => {
                                console.log("ERROR", err);
                            });
                    });
                });
            })
            .catch((err) => {
                return res
                    .status(500)
                    .send({ success: false, message: "Please try again!" });
            });
    } else {
        return res.send({ success: false, message: "Invalid data" });
    }
};

exports.getAllOrders = (req, res) => {
    OrderSchema.find({})
        .then((ordersResp) => {
            let items = ordersResp;

            let temp2 = [];

            ordersResp.map((order, idx) => {
                let products = [];
                order.products.map((pds, idx2) => {
                    axios
                        .get(
                            `http://localhost:8080/product/get/id/${pds.productId}`,
                            {
                                headers: {
                                    authorization: req.headers.authorization,
                                },
                            }
                        )
                        .then((resp) => {
                            products.push(resp.data.product);

                            if (products.length === order.products.length) {
                                temp2.push({ order, products: products });
                                console.log("Final", temp2);
                                if (temp2.length === ordersResp.length) {
                                    return res
                                        .status(200)
                                        .send({ success: true, orders: temp2 });
                                }
                            }
                        })
                        .catch((err) => {
                            console.log("ERROR", err);
                        });
                });
            });
        })
        .catch((err) => {
            return res
                .status(500)
                .send({ success: false, message: "Please try again!" });
        });
};
