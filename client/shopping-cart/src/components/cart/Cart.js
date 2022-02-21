import React, {useState, useEffect} from "react";
import Button from "../shared/Button";
import dummyImage from "../../static/backiee-181542.jpg";
import Input from "../shared/Input";
import Formlabel from "../shared/FormLabel";
import axios from "axios";

const Cart = (props) => {

    const [cartItems, setCartItems] = useState([]);

    const loadCartItems = () => {
        
        // Change the userId once user state is ready to use
        axios.get("http://localhost:8080/cart/get/items/6210b114631fc0960e94bac8", {
            headers: {
                authorization: window.localStorage.getItem('bearer'),
            }
        })
        .then((response) => {
            let cartItems = response.data.cartItems
            
            cartItems.map((item, idx) => {
                axios.get(`http://localhost:8080/product/get/id/${item.productId}`, {
                    headers: {
                        authorization: window.localStorage.getItem('bearer'),
                    }
                }).then((productResp) => {
                    cartItems[idx]["product"] = productResp.data.product;
                    if(idx === cartItems.length -1){
                        setCartItems(cartItems)
                    }
                })
                .catch((productErr) => {
                    console.log("Product Err", productErr);
                })
            })
        })
        .catch((err) => {
            console.log(err.response.data);
        })
    }

    useEffect(() => {
        loadCartItems();
    },[]);

    const getOrderAmount = () => {
        let orderAmt = cartItems.reduce((prevTotal, item) => {
            return prevTotal += item.product.price
        }, 0);
        return orderAmt;
    }

    const getTotalAmount = () => {
        return getOrderAmount() + 127.8 + 250
    }
    
    const handleCartDelete = (cartItemId) => {
        const confirmDelete = window.confirm("Are you sure you want to delete this item from your cart?");
        if(confirmDelete){
            axios.delete(`http://localhost:8080/cart/delete/item/${cartItemId}`, {
                headers: {
                    authorization: window.localStorage.getItem('bearer'),
                }
            })
            .then((deleteResp) => {
                console.log(deleteResp.data);
                loadCartItems();
            })
            .catch((err) => {
                console.log(err.response.data);
            })
        }
    }

    
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
                                    {/* <th>Quantity</th> */}
                                    <th>Price</th>
                                    {/* <th>Total</th> */}
                                    {/* <th>Edit</th> */}
                                    <th>Delete</th>
                                </tr>
                            </thead>
                            <tbody>
                                {cartItems.map((item, idx) => (
                                    <tr key={idx}>
                                        <td width={200}>
                                            <img
                                                src={dummyImage}
                                                style={{ maxHeight: "30px" }}
                                            />
                                        </td>
                                        <td>{item.product.name}</td>
                                        {/* <td>2</td> */}
                                        <td>₹ {item.product.price}</td>
                                        {/* <td>₹ 11,998</td> */}
                                        {/* <td>📝</td> */}
                                        <td><Button color="danger" handleClick={() => handleCartDelete(item._id)}>🗑️</Button></td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <div className="total-section">
                        <div className="row">
                            <div className="col-md-6">
                                <form>
                                    <div className="row">
                                        <div className="col-md-6 m-auto">
                                            <div className="form-group">
                                                <Formlabel
                                                    htmlFor="address"
                                                    label="Delivery Address:"
                                                />
                                                <Input
                                                    name="address"
                                                    placeholder="Please enter your address"
                                                />
                                            </div>
                                        </div>
                                        <div className="col-md-6 m-auto">
                                            <div className="form-group">
                                                <Formlabel
                                                    htmlFor="contact"
                                                    label="Contact Number:"
                                                />
                                                <Input
                                                    name="contact"
                                                    type="number"
                                                    placeholder="Please enter your contact number"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row my-2">
                                        <div className="form-group">
                                            <Button color="warning">
                                                <strong>Place Order</strong>
                                            </Button>
                                        </div>
                                    </div>
                                </form>
                            </div>

                            <div className="col-md-3 text-end">
                                <h5>Order Amount:</h5>
                                <h5>Sales Tax:</h5>
                                <h5>Shipping Charges:</h5>
                                <h3 className="text-success">Total:</h3>
                            </div>
                            <div className="col-md-3 text-start">
                                <h5>₹ {getOrderAmount()}</h5>
                                <h5>₹ 127.8</h5>
                                <h5>₹ 250</h5>
                                <h3 className="text-success">₹ {getTotalAmount()}</h3>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Cart;
