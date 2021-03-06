import React, { useState, useEffect } from "react";
import OrderCard from "../orders/OrderCard";
import axios from "axios";
import Input from "../shared/Input";
import { useDispatch } from "react-redux";
import { showBanner } from "../../redux";

const AdminSales = () => {
    const [allOrders, setAllOrders] = useState([]);
    const [filteredOrders, setFilteredOrders] = useState([]);

    const dispatch = useDispatch();

    const getTotalSales = () => {
        return filteredOrders
            .reduce((prev, order) => {
                return (prev += order.order.totalAmount);
            }, 0)
            .toFixed(3);
    };

    const getTotalQuantitiesSold = () => {
        return filteredOrders.reduce((prev, order) => {
            return (prev += order.order.products.reduce((qts, prd) => {
                return (qts += prd.buyQuantity);
            }, 0));
        }, 0);
    };

    useEffect(() => {
        axios
            .get("http://localhost:8080/user/get/currentuser", {
                headers: {
                    authorization: window.localStorage.getItem("bearer"),
                },
            })
            .then((currentUserResp) => {
                axios
                    .get(`http://localhost:8080/order/get/all`, {
                        headers: {
                            authorization:
                                window.localStorage.getItem("bearer"),
                        },
                    })
                    .then((ordersResp) => {
                        setAllOrders(ordersResp.data.orders);
                        setFilteredOrders(ordersResp.data.orders);
                    })
                    .catch((err) => {
                        return dispatch(
                            showBanner({
                                apiErrorResponse: err.response?.data?.message,
                            })
                        );
                    });
            })
            .catch((err2) => {
                return dispatch(
                    showBanner({
                        apiErrorResponse: err2.response?.data?.message,
                    })
                );
            });
    }, []);

    const performSearchFilter = (e) => {
        let filterQuery = e.target.value;

        setFilteredOrders(
            allOrders.filter((order) => {
                return (
                    order.order.timestamp.toString().split("T")[0] ===
                    filterQuery
                );
            })
        );
    };

    return (
        <div className="row m-0 p-2">
            <div className="header mt-3">
                <h2>All Orders ????</h2>
            </div>
            <div className="col-md-4 my-3">
                <h4>Total Sales: ???{getTotalSales()}</h4>
            </div>
            <div className="col-md-4 my-3">
                <h4>Total Quantities Sold: {getTotalQuantitiesSold()}</h4>
            </div>
            <div className="col-md-4 my-3">
                <Input
                    type="date"
                    placeholder="Search by date"
                    handleChange={performSearchFilter}
                />
            </div>
            {filteredOrders.map((record, idx) => (
                <OrderCard record={record} key={idx} />
            ))}
        </div>
    );
};

export default AdminSales;
