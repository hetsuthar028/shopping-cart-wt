import React, { useState, useEffect } from "react";
import Card from "../shared/Card";
import Formlabel from "../shared/FormLabel";
import Input from "../shared/Input";
import Button from "../shared/Button";
import axios from "axios";
import { useDispatch } from "react-redux";
import { showBanner } from '../../redux';
import { useNavigate } from "react-router-dom";

const initialValues = {
    productName: "",
    quantity: 0,
    rate: 0,
    totalAmt: 0,
};

const initialMRValues = {
    mrDate: "",
    mrNo: "",
    supplier: "",
};

const AddMR = () => {
    const [mrData, setMrData] = useState(initialMRValues);
    const [totalProducts, setTotalProducts] = useState(1);
    const [productValues, setProductValues] = useState([initialValues]);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleAddNewRow = (e) => {
        e.preventDefault();
        console.log("Something");
        console.log(mrData);
        setTotalProducts((totalProducts) => totalProducts + 1);
    };

    useEffect(() => {
        axios.get("http://localhost:8080/user/get/currentuser", {
            headers: {
                authorization: window.localStorage.getItem('bearer'),
            }
        })
        .then((currentUserResp) => {
            console.log(currentUserResp.data);
            if(!currentUserResp.data.user.isAdmin){
                dispatch(showBanner({apiErrorResponse: "Unauthorized user"}));
                return navigate('/home');
            }
        })
        .catch((err) => {
            console.log(err.response?.data);
            dispatch(showBanner({apiErrorResponse: err.response?.data.message}));
            if(err.response.status === 403){
                return navigate('/home');
            }
            return navigate('/auth/login');
        })
    }, []);

    const handleMRDataInputChange = (e) => {
        const { name, value } = e.target;
        setMrData({
            ...mrData,
            [name]: value,
        });
    };

    const handleProductInputChange = (e, idx) => {
        let tempProducts = productValues;
        let { name, value } = e.target;
        let something = {
            ...productValues[idx],
            [name]: value,
        };
        tempProducts[idx] = something;
        // console.log(tempProducts);
        setProductValues([...tempProducts]);
        // setProductValues([productValues[idx][e.target.name] = e.target.value])
    };

    const handleFormSubmit = (e) => {
        e.preventDefault();
        console.log("FORM SUBMIT");
        console.log(productValues);
        console.log(mrData);
        axios.post("http://localhost:8080/materialReceipt/add", {
            ...mrData,
            products: productValues
        }, {
            headers: {
                authorization: window.localStorage.getItem('bearer'),
            }
        })
        .then((addResp) => {
            console.log(addResp);
            showBanner({apiSuccessResponse: "Material Receipt Generated ✔️"});
            return navigate('/admin/mr/');
        })
        .catch((err) => {
            console.log(err.response.data);
            return showBanner({apiErrorResponse: err.response?.data.message});
        })
    }

    return (
        <div>
            <div className="col-md-11 m-auto">
                <form method="POST" onSubmit={handleFormSubmit}>
                    <Card>
                        <h3>Add Material Receipt</h3>
                        <div className="row m-0 mt-3">
                            <div className="col-md-4 p-1 m-auto">
                                <div className="form-group">
                                    <Formlabel
                                        htmlFor="mrDate"
                                        label="MR Date:"
                                    />
                                    <Input
                                        placeholder="Please enter MR date"
                                        type="date"
                                        name="mrDate"
                                        value={mrData.mrDate}
                                        handleChange={handleMRDataInputChange}
                                    />
                                </div>
                            </div>
                            <div className="col-md-4 p-1 m-auto">
                                <div className="form-group">
                                    <Formlabel
                                        htmlFor="mrNo"
                                        label="MR Number:"
                                    />
                                    <Input
                                        placeholder="Please enter MR Number"
                                        name="mrNo"
                                        value={mrData.mrNo}
                                        handleChange={handleMRDataInputChange}
                                    />
                                </div>
                            </div>

                            <div className="col-md-10 p-1 m-auto">
                                <div className="form-group">
                                    <Formlabel
                                        htmlFor="supplier"
                                        label="Supplier:"
                                    />
                                    <Input
                                        placeholder="Please enter Supplier Name"
                                        name="supplier"
                                        value={mrData.supplier}
                                        handleChange={handleMRDataInputChange}
                                    />
                                </div>
                            </div>
                        </div>
                        {/* <hr /> */}

                        <div className="row m-0 mt-3">
                            <table className="table">
                                <thead>
                                    <tr>
                                        <th>Product Name</th>
                                        <th>Quantity</th>
                                        <th>Rate (Price)</th>
                                        <th>Total Amount</th>
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {[...Array(totalProducts).keys()].map(
                                        (arr, idx) => (
                                            <tr key={idx}>
                                                <td>
                                                    <Input
                                                        className="border-success"
                                                        value={
                                                            productValues[idx]
                                                                ?.productName ===
                                                            undefined
                                                                ? ""
                                                                : productValues[
                                                                      idx
                                                                  ].productName
                                                        }
                                                        name="productName"
                                                        handleChange={(e) =>
                                                            handleProductInputChange(
                                                                e,
                                                                idx
                                                            )
                                                        }
                                                    />
                                                </td>
                                                <td>
                                                    <Input
                                                        className="border-success"
                                                        value={
                                                            productValues[idx]
                                                                ?.quantity ===
                                                            undefined
                                                                ? ""
                                                                : productValues[
                                                                      idx
                                                                  ].quantity
                                                        }
                                                        name="quantity"
                                                        type="number"
                                                        handleChange={(e) =>
                                                            handleProductInputChange(
                                                                e,
                                                                idx
                                                            )
                                                        }
                                                    />
                                                </td>
                                                <td>
                                                    <Input
                                                        className="border-success"
                                                        value={
                                                            productValues[idx]
                                                                ?.rate ===
                                                            undefined
                                                                ? ""
                                                                : productValues[
                                                                      idx
                                                                  ].rate
                                                        }
                                                        type="number"
                                                        name="rate"
                                                        handleChange={(e) =>
                                                            handleProductInputChange(
                                                                e,
                                                                idx
                                                            )
                                                        }
                                                    />
                                                </td>
                                                <td>
                                                    <Input
                                                        className="border-success"
                                                        value={
                                                            productValues[idx]
                                                                ?.totalAmt ===
                                                            undefined
                                                                ? ""
                                                                : productValues[
                                                                      idx
                                                                  ].totalAmt
                                                        }
                                                        type="number"
                                                        name="totalAmt"
                                                        handleChange={(e) =>
                                                            handleProductInputChange(
                                                                e,
                                                                idx
                                                            )
                                                        }
                                                    />
                                                </td>
                                                <td>
                                                    <Button
                                                        color="warning"
                                                        handleClick={
                                                            handleAddNewRow
                                                        }
                                                    >
                                                        ➕
                                                    </Button>
                                                </td>
                                            </tr>
                                        )
                                    )}
                                </tbody>
                            </table>
                        </div>
                        <div className="row m-0 mt-3">
                            <div className="col-md-12 m-auto">
                                <Button type="submit" color="success">
                                    Submit
                                </Button>
                                <Button type="submit" color="danger">
                                    Cancel
                                </Button>
                            </div>
                        </div>
                    </Card>
                </form>
            </div>
        </div>
    );
};

export default AddMR;
