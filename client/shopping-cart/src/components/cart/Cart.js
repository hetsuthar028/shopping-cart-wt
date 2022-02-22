import React, {useState, useEffect} from "react";
import Button from "../shared/Button";
import dummyImage from "../../static/backiee-181542.jpg";
import Input from "../shared/Input";
import Formlabel from "../shared/FormLabel";
import axios from "axios";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { showBanner } from '../../redux';
import FormHelperText from "../shared/FormHelperText";

const initialContactForm = {
    address: "",
    contact: "",
}

const Cart = (props) => {

    const [cartItems, setCartItems] = useState([]);
    const [hasErrors, setHasErrors] = useState(true);
    const [errors, setErrors] = useState([]);
    const [contactDetails, setContactDetails] = useState(initialContactForm);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const loadCartItems = () => {
        
        // Change the userId once user state is ready to use
        axios.get('http://localhost:8080/user/get/currentuser', {
            headers: {
                authorization: window.localStorage.getItem('bearer'),
            }
        })
        .then((currentUserResp) => {
            let userId = currentUserResp.data.user._id
            axios.get(`http://localhost:8080/cart/get/items/${userId}`, {
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
                        dispatch(showBanner({apiErrorResponse: productErr.response.data.message}));
                        return navigate('/auth/login');
                    })
                })

                dispatch(showBanner({apiSuccessResponse: "Loading 🛒..."}));
            })
            .catch((err) => {
                console.log("Something")
                dispatch(showBanner({apiErrorResponse: err.response.data.message}));
                return navigate('/auth/login');
            })
        })
        .catch((currentUserErr) => {
            dispatch(showBanner({apiErrorResponse: currentUserErr.response.data.message}));
            return navigate('/auth/login');
        })   
    }

    const validateForm = (field, value) => {
        if(field === "address" && value.length < 15){
            setHasErrors(true);
            return "Invalid address"
        }
        else if(field === "contact" && value.toString().length != 10){
            setHasErrors(true);
            return "Invalid contact number"
        }
        else {
            setHasErrors(false);
        }
    }

    const handleInputChange = (e) => {
        const {name, value} = e.target;
        setContactDetails({
            ...contactDetails,
            [name]: value
        });

        setErrors({
            ...errors,
            [name]: validateForm(name, value),
        });
    }

    const handleFormSubmit = (e) => {
        e.preventDefault();

        axios.post('http://localhost:8080/order/purchase/', {
            "userId": cartItems[0].userId,
            "totalAmount": getTotalAmount(),
            "address": contactDetails.address,
            "contact": contactDetails.contact,
            "products": cartItems.map((item) => item.productId),
        }, {
            headers: {
                authorization: window.localStorage.getItem('bearer'),
            }
        })
        .then((orderResp) => {
            console.log(orderResp);
            dispatch(showBanner({apiSuccessResponse: orderResp.data.message}));
            return navigate('/home');
        })
        .catch((err) => {
            console.log(err.response.data);
            dispatch(showBanner({apiErrorResponse: err.response?.data.message}));
            return navigate('/home');
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
                                <form method="POST" onSubmit={handleFormSubmit}>
                                    <div className="row">
                                        <div className="col-md-6 m-auto">
                                            <div className="form-group">
                                                <Formlabel
                                                    htmlFor="address"
                                                    label="Billing Address:"
                                                />
                                                <Input
                                                    name="address"
                                                    placeholder="Please enter your address"
                                                    value={contactDetails.address}
                                                    handleChange={handleInputChange}
                                                />
                                                <FormHelperText>{errors.address}</FormHelperText>
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
                                                    value={contactDetails.contact}
                                                    handleChange={handleInputChange}
                                                    placeholder="Please enter your contact number"
                                                />
                                                <FormHelperText>{errors.contact}</FormHelperText>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row my-2">
                                        <div className="form-group">
                                            <Button type="submit" disabled={hasErrors || cartItems.length == 0} color="warning">
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
