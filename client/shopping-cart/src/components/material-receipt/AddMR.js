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
        console.log("Something");
        console.log(mrData);
        setTotalProducts((totalProducts) => totalProducts + 1);
    };

    useEffect(() => {
        console.log("Location", location);
        if (location.state != null) {
            let { mrDate, mrNo, supplier, products } = location?.state;
            setFormEdit(true);
            setTotalProducts(products.length);

            // 🐛✔️ After - Bug Fixed
            setProductValues(products.map((product) =>(
                {
                    quantity: product.quantity,
                    rate: product.rate,
                    totalAmt: product.totalAmt,
                    _id: product._id,
                    productId: product.productId._id

                }
            )))
            
            // 🐛🤔 Before
            // console.log(products);
            // setProductValues(products);
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
                console.log(currentUserResp.data);

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
                        console.log("Get err", getErr.response.data);
                    });

                if (!currentUserResp.data.user.isAdmin) {
                    dispatch(
                        showBanner({ apiErrorResponse: "Unauthorized user" })
                    );
                    return navigate("/home");
                }
            })
            .catch((err) => {
                console.log(err.response?.data);
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
        
        // console.log(tempProducts);
        setProductValues([...tempProducts]);
        if(name === 'totalAmt'){
            console.log(tempProducts.reduce((prev, prod) => {
                return prev += parseFloat(prod.totalAmt)
            }, 0))
            setMrData({...mrData, "totalAmount": tempProducts.reduce((prev, prod) => {
                return prev += parseFloat(prod.totalAmt)
            }, 0)});
        }
        
        // setProductValues([productValues[idx][e.target.name] = e.target.value])
    };

    const handleFormSubmit = (e) => {
        e.preventDefault();
        console.log("FORM SUBMIT");
        console.log(productValues);
        console.log(mrData);

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
                    console.log("Update Resp", updateResp.data);
                    dispatch(
                        showBanner({
                            apiSuccessResponse: "Material Receipt Updated!",
                        })
                    );
                    return navigate(-1);
                })
                .catch((err) => {
                    console.log("Update Err", err.response);
                    return navigate(-1);
                });
        } else {
            console.log(productValues);
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
                    console.log(addResp);
                    showBanner({
                        apiSuccessResponse: "Material Receipt Generated ✔️",
                    });
                    return navigate("/admin/mr/");
                })
                .catch((err) => {
                    console.log(err.response.data);
                    return showBanner({
                        apiErrorResponse: err.response?.data.message,
                    });
                });
        }
    };

    const handleSelectChange = (value, idx) => {
        let tempValues = productValues;
        tempValues[idx] = {
            ...tempValues[idx],
            "productId": value
        }

        setProductValues([...tempValues]);
    }

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
                                                            handleSelectChange(e.target.value, idx)
                                                        }
                                                        value={
                                                            productValues[idx]
                                                                ?.productId === undefined ? 
                                                               0 : productValues[idx]
                                                                ?.productId
                                                        }
                                                    >
                                                        <option value={0}>Please select product</option>
                                                        {products.map(
                                                            (product, idx) => (
                                                                <option
                                                                    value={
                                                                        product._id
                                                                    }
                                                                    key={idx}
                                                                >
                                                                    {
                                                                        product.name
                                                                    }
                                                                </option>
                                                            )
                                                        )}
                                                    </select>
                                                    {/* <Input
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
                                                    /> */}
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
