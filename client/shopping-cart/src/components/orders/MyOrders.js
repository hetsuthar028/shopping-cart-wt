import axios from "axios";
import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import OrderCard from "./OrderCard";
import { Link } from "react-router-dom";
import Button from "../shared/Button";

const MyOrders = () => {
    const [myOrders, setMyOrders] = useState([]);

    useEffect(() => {
        axios
            .get("http://localhost:8080/user/get/currentuser", {
                headers: {
                    authorization: window.localStorage.getItem("bearer"),
                },
            })
            .then((currentUserResp) => {
                let userId = currentUserResp.data.user._id;
                axios
                    .get(`http://localhost:8080/order/get/id/${userId}`, {
                        headers: {
                            authorization:
                                window.localStorage.getItem("bearer"),
                        },
                    })
                    .then((ordersResp) => {
                        console.log("Data", ordersResp);
                        setMyOrders(ordersResp.data.orders);
                    })
                    .catch((err) => {
                        console.log("ERROR in Getting orders", err.response);
                    });
            })
            .catch((err2) => {
                console.log("ERR2", err2);
            });
    }, []);

    return (
        <div className="row m-0 p-2">
            <div className="header mt-3">
                <h2>My Orders 🧾</h2>
            </div>
            {myOrders.map((record, idx) => (
                <OrderCard record={record} key={idx} />
            ))}
            {myOrders.length === 0 && (
                <div className="my-3">
                    <h3>Your bucket seems to be empty! 🤔</h3>
                    <Link to="/home">
                        <Button>Purchase some exciting products! 🤩</Button>
                    </Link>
                </div>
            )}
        </div>
    );
};

export default MyOrders;
