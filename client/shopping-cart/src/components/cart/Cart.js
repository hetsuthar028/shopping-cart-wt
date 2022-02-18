import React from "react";
import Button from "../shared/Button";
import dummyImage from "../../static/backiee-181542.jpg";

const Cart = (props) => {
    return (
        <div>
            <div className="row m-0">
                <div className="col-md-12">
                    <div className="header mt-3">
                        <h2>My Cart 🛒</h2>
                    </div>
                    {/* <div className="total-section">
                        <div className="row">
                            <div className="col-md-3 text-end">
                                <h5>Order Amount:</h5>
                                <h5>Sales Tax:</h5>
                                <h5>Shipping Charges:</h5>
                                <h3 className="text-success">Total:</h3>
                            </div>
                            <div className="col-md-3 text-start">
                                <h5>₹ 5,10,347</h5>
                                <h5>₹ 127.8</h5>
                                <h5>₹ 250</h5>
                                <h3 className="text-success">₹ 5,10,724.8</h3>
                            </div>
                            <div className="col-md-6" style={{display: "flex", "justifyContent": 'center', alignItems: "center"}}>
                                <Button color="warning"><strong>Place Order</strong></Button>
                            </div>
                        </div>
                    </div> */}
                    <div className="cart-grid my-3 p-3">
                        <table className="table table-striped">
                            <thead className="table-dark">
                                <tr>
                                    <th></th>
                                    <th>Product Name</th>
                                    <th>Quantity</th>
                                    <th>Price</th>
                                    <th>Total</th>
                                    {/* <th>Edit</th> */}
                                    <th>Delete</th>
                                </tr>
                            </thead>
                            <tbody>
                                {[1, 2, 3, 4, 5].map((item, idx) => (
                                    <tr key={idx}>
                                        <td width={200}>
                                            <img
                                                src={dummyImage}
                                                style={{ maxHeight: "30px" }}
                                            />
                                        </td>
                                        <td>Amazon Alexa</td>
                                        <td>2</td>
                                        <td>₹ 5,999</td>
                                        <td>₹ 11,998</td>
                                        {/* <td>📝</td> */}
                                        <td>🗑️</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <div className="total-section">
                        <div className="row">
                            <div className="col-md-6" style={{display: "flex", "justifyContent": 'center', alignItems: "center"}}>
                                {/* <Button color="warning"><strong>Place Order</strong></Button> */}
                            </div>
                            <div className="col-md-3 text-end">
                                <h5>Order Amount:</h5>
                                <h5>Sales Tax:</h5>
                                <h5>Shipping Charges:</h5>
                                <h3 className="text-success">Total:</h3>
                            </div>
                            <div className="col-md-3 text-start">
                                <h5>₹ 5,10,347</h5>
                                <h5>₹ 127.8</h5>
                                <h5>₹ 250</h5>
                                <h3 className="text-success">₹ 5,10,724.8</h3>
                                <Button color="warning"><strong>Place Order</strong></Button>
                            </div>
                            
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Cart;
