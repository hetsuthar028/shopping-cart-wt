import React from "react";
import Card from "../shared/Card";
import Button from "../shared/Button";
import dummyImage from "../../static/1356594.png";

const OrderCard = (props) => {
    const { order, products } = props.record;
    return (
        <div className="col-md-6">
            <Card>
                <div className="row my-3">
                    <h4>Order Id: {order._id}</h4>
                </div>
                <div className="row">
                    <div className="col-md-2 m-auto">
                        <img height={"100px"} src={dummyImage} />
                    </div>
                    <div className="col-md-4">
                        <h5>Products:</h5>
                        <hr />
                        {products.map((product, idx) => (
                            <h6 key={idx}>{product.name}</h6>
                        ))}
                    </div>
                    <div className="col-md-2">
                        <h5>Quantity:</h5>
                        <hr />
                        {order.products.map((product, idx) => (
                            <h6 key={idx}>{product.buyQuantity}</h6>
                        ))}
                    </div>
                    <div className="col-md-3">
                        <h5>
                            {
                                new Date(order.timestamp)
                                    .toISOString()
                                    .split("T")[0]
                            }
                        </h5>
                        <hr />

                        <h6>
                            <strong>Total:</strong> ₹{order.totalAmount}
                        </h6>
                    </div>
                </div>
                <div className="row mt-3 text-start">
                    <h6>Address: {order.address}</h6>
                    <h6>Contact: {order.contact}</h6>
                </div>
            </Card>
        </div>
    );
};

export default OrderCard;
