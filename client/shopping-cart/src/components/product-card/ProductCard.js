import React, { useState, useEffect } from "react";
import Card from "../shared/Card";
import dummyImage from "../../static/backiee-181542.jpg";
import Button from "../shared/Button";
import axios from "axios";
import { useDispatch } from "react-redux";
import { showBanner } from "../../redux";

const Productcard = (props) => {
    const { _id, name, price, description } = props.product;

    const [totalQuantities, setTotalQuantities] = useState(0);
    const dispatch = useDispatch();

    const handleAddToCart = () => {
        axios
            .get("http://localhost:8080/user/get/currentuser", {
                headers: {
                    authorization: window.localStorage.getItem("bearer"),
                },
            })
            .then((currentUserResp) => {
                let userId = currentUserResp.data.user._id;
                if (currentUserResp.data.user.isAdmin === true) {
                    return dispatch(
                        showBanner({
                            apiErrorResponse:
                                "Admin can't perform this action!",
                        })
                    );
                }
                axios
                    .post(
                        "http://localhost:8080/cart/add/item",
                        {
                            productId: _id,
                            userId: userId,
                            buyQuantity: 1,
                        },
                        {
                            headers: {
                                authorization:
                                    window.localStorage.getItem("bearer"),
                            },
                        }
                    )
                    .then((addToCartResp) => {
                        return dispatch(
                            showBanner({
                                apiSuccessResponse: "Item added to cart",
                            })
                        );
                        // Dispplay a popup message here
                    })
                    .catch((addToCartErr) => {
                        return dispatch(
                            showBanner({
                                apiErrorResponse:
                                    addToCartErr.response?.data.message,
                            })
                        );
                    });
            })
            .catch((err) => {
                return dispatch(
                    showBanner({ apiErrorResponse: err.response?.data.message })
                );
            });
    };

    useEffect(() => {
        axios
            .get(
                `http://localhost:8080/materialreceipt/get/qty/by/product/id/${_id}`,
                {
                    headers: {
                        authorization: window.localStorage.getItem("bearer"),
                    },
                }
            )
            .then((totalResp) => {
                setTotalQuantities(totalResp.data.totalQuantities);
            })
            .catch((err) => {
                return dispatch(
                    showBanner({ apiErrorResponse: err.response?.data.message })
                );
            });
    }, []);

    return (
        props && (
            <div style={{ display: "inline-flex" }}>
                <Card
                    style={{
                        minWidth: "300px",
                        maxWidth: "300px",
                        margin: "10px",
                    }}
                >
                    <img
                        // src='https://source.unsplash.com/random'
                        src={dummyImage}
                        style={{ maxHeight: "150px" }}
                    />
                    <h3 className="my-2">{name}</h3>
                    <h5 className="text-success">Price: ₹{price}/-</h5>
                    <h5>
                        <b>Only {totalQuantities} left</b>
                    </h5>
                    <p
                        style={{
                            textAlign: "justify",
                            textJustify: "inter-word",
                        }}
                        className="m-0"
                    >
                        {description}
                    </p>

                    <Button
                        color="warning"
                        handleClick={handleAddToCart}
                        disabled={totalQuantities === 0}
                    >
                        <strong>Add to Cart</strong>
                    </Button>
                </Card>
            </div>
        )
    );
};

export default Productcard;
