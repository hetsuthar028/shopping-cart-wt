import React, { useState, useEffect } from "react";
import Card from "../shared/Card";
import Formlabel from "../shared/FormLabel";
import Input from "../shared/Input";
import Button from "../shared/Button";
import axios from "axios";
import { useDispatch } from "react-redux";
import { showBanner } from "../../redux";
import { useLocation, useNavigate } from "react-router-dom";

const initialValues = {
    productId: 0,
    quantity: 0,
    rate: 0,
    totalAmt: 0,
};

const initialMRValues = {
    mrDate: "",
    mrNo: "",
    supplier: "",
    totalAmount: 0,
};

const AddMR = () => {
    const [mrData, setMrData] = useState(initialMRValues);
    const [totalProducts, setTotalProducts] = useState(1);
    const [productValues, setProductValues] = useState([initialValues]);

    const [products, setProducts] = useState([]);

    const [formEdit, setFormEdit] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();

    const handleAddNewRow = (e) => {
        e.preventDefault();
        setTotalProducts((totalProducts) => totalProducts + 1);
    };

    const handleRowDelete = (e, idx) => {
        e.preventDefault();
        
        if (totalProducts === 1) {
            return;
        }
        
        let tempProducts = productValues;
        productValues.splice(idx, 1);
        
        setProductValues([...productValues]);
        setTotalProducts((prod) => prod - 1);
        setMrData({
            ...mrData,
            totalAmount: tempProducts.reduce((prev, prod) => {
                return (prev += parseFloat(prod.totalAmt ?? 0));
            }, 0),
        });
    };

    useEffect(() => {

        if (location.state != null) {
            let { mrDate, mrNo, supplier, products } = location?.state;
            
            setFormEdit(true);
            setTotalProducts(products.length);

            setProductValues(
                products.map((product) => ({
                    quantity: product.quantity,
                    rate: product.rate,
                    totalAmt: product.totalAmt,
                    _id: product._id,
                    productId: product?.productId?._id,
                }))
            );

            setMrData({
                mrDate: mrDate.toString().split("T")[0],
                mrNo,
                supplier,
            });
        }

        axios
            .get("http://localhost:8080/user/get/currentuser", {
                headers: {
                    authorization: window.localStorage.getItem("bearer"),
                },
            })
            .then((currentUserResp) => {
                
                // Get all products for the dropdown
                axios
                    .get(`http://localhost:8080/product/get/all`, {
                        headers: {
                            authorization:
                                window.localStorage.getItem("bearer"),
                        },
                    })
                    .then((getResp) => {
                        setProducts(getResp.data.products);
                    })
                    .catch((getErr) => {
                        return dispatch(
                            showBanner({
                                apiErrorResponse: getErr.response?.data.message,
                            })
                        );
                    });

                if (!currentUserResp.data.user.isAdmin) {
                    dispatch(
                        showBanner({ apiErrorResponse: "Unauthorized user" })
                    );
                    return navigate("/home");
                }
            })
            .catch((err) => {
                dispatch(
                    showBanner({ apiErrorResponse: err.response?.data.message })
                );
                if (err.response.status === 403) {
                    return navigate("/home");
                }
                return navigate("/auth/login");
            });
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

        const totalAmt =
            parseInt(Number(tempProducts[idx].quantity ?? 0)) *
            parseFloat(Number(tempProducts[idx].rate ?? 0));
        tempProducts[idx].totalAmt = totalAmt;

        setProductValues([...tempProducts]);

        setMrData({
            ...mrData,
            totalAmount: tempProducts.reduce((prev, prod) => {
                return (prev += parseFloat(prod.totalAmt ?? 0));
            }, 0),
        });
    };

    const validateForm = () => {
        return productValues.every((product) => {
            return (
                (product.productId ?? 0) != 0 &&
                parseInt(product.quantity ?? 0) > 0 &&
                parseInt(product.rate ?? 0) > 0 &&
                parseInt(product.totalAmt ?? 0) > 0
            );
        });
    };

    const handleFormSubmit = (e) => {
        e.preventDefault();

        if (!validateForm()) {
            dispatch(showBanner({ apiErrorResponse: "Invalid data" }));
            return;
        }
        if (formEdit) {
            axios
                .put(
                    `http://localhost:8080/materialReceipt/update/id/${mrData.mrNo}`,
                    {
                        ...mrData,
                        products: productValues,
                    },
                    {
                        headers: {
                            authorization:
                                window.localStorage.getItem("bearer"),
                        },
                    }
                )
                .then((updateResp) => {
                    dispatch(
                        showBanner({
                            apiSuccessResponse: "Material Receipt Updated!",
                        })
                    );
                    return navigate(-1);
                })
                .catch((err) => {
                    return navigate(-1);
                });
        } else {
            axios
                .post(
                    "http://localhost:8080/materialReceipt/generate",
                    {
                        ...mrData,
                        products: productValues,
                    },
                    {
                        headers: {
                            authorization:
                                window.localStorage.getItem("bearer"),
                        },
                    }
                )
                .then((addResp) => {
                    dispatch(
                        showBanner({
                            apiSuccessResponse: "Material Receipt Generated ✔️",
                        })
                    );
                    return navigate("/admin/mr/");
                })
                .catch((err) => {
                    return dispatch(
                        showBanner({
                            apiErrorResponse: err.response?.data.message,
                        })
                    );
                });
        }
    };

    const handleSelectChange = (value, idx) => {
        let tempValues = productValues;
        tempValues[idx] = {
            ...tempValues[idx],
            productId: value,
            rate: products.filter((product) => product._id == value)[0].price,
            totalAmt:
                parseFloat(
                    products.filter((product) => product._id == value)[0].price
                ) * tempValues[idx].quantity,
        };

        setProductValues([...tempValues]);
    };

    const getGrandTotal = () => {
        return productValues?.reduce((prev, product) => {
            return (prev += product.totalAmt ?? 0);
        }, 0);
    };

    return (
        <div>
            <div className="col-md-11 m-auto">
                <form method="POST" onSubmit={handleFormSubmit}>
                    <Card>
                        <h3>{formEdit ? "Edit" : "Add"} Material Receipt</h3>
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
                                        type="number"
                                        value={mrData.mrNo}
                                        disabled={formEdit}
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
                                                    <select
                                                        name="productId"
                                                        className="form-select my-2 border-success"
                                                        onChange={(e) =>
                                                            handleSelectChange(
                                                                e.target.value,
                                                                idx
                                                            )
                                                        }
                                                        value={
                                                            productValues[idx]
                                                                ?.productId ===
                                                            undefined
                                                                ? 0
                                                                : productValues[
                                                                      idx
                                                                  ]?.productId
                                                        }
                                                    >
                                                        <option value={0}>
                                                            Please select
                                                            product
                                                        </option>
                                                        {products.map(
                                                            (product, idx) => (
                                                                <option
                                                                    value={
                                                                        product?._id
                                                                    }
                                                                    key={idx}
                                                                >
                                                                    {
                                                                        product?.name
                                                                    }
                                                                </option>
                                                            )
                                                        )}
                                                    </select>
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
                                                        disabled={true}
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
                                                    <Button
                                                        color="danger"
                                                        handleClick={(e) =>
                                                            handleRowDelete(
                                                                e,
                                                                idx
                                                            )
                                                        }
                                                    >
                                                        ➖
                                                    </Button>
                                                </td>
                                            </tr>
                                        )
                                    )}
                                </tbody>
                            </table>
                        </div>
                        <div className="row m-0 mt-3">
                            <h3>Grand Total: ₹{getGrandTotal()}</h3>
                        </div>
                        <div className="row m-0 mt-3">
                            <div className="col-md-12 m-auto">
                                <Button type="submit" color="success">
                                    Submit
                                </Button>
                                <Button
                                    handleClick={(e) => {
                                        e.preventDefault();
                                        navigate("/admin/mr");
                                    }}
                                    color="danger"
                                >
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
