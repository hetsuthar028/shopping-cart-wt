import React, { useState, useEffect } from "react";
import Button from "../shared/Button";
import Card from "../shared/Card";
import Formlabel from "../shared/FormLabel";
import Input from "../shared/Input";
import FormHelperText from "../shared/FormHelperText";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { showBanner } from '../../redux';

const initialValues = {
    productName: '',
    productDescription: '',
    productPrice: '',
    // productQuantity: '',
    productStatus: false,
}

const AddProduct = (props) => {

    const [values, setValues] = useState(initialValues);
    const [errors, setErrors] = useState({});
    const [hasErrors, setHasErrors] = useState(true);

    const userState = useSelector((state) => state.user.user);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        if(!userState.isAdmin){
            dispatch(showBanner({apiErrorResponse: "Unauthorized user"}));
            return navigate('/home');
        }
    }, []);

    const handleFormSubmit = (e) => {
        e.preventDefault();
        console.log(values);
        axios.post("http://localhost:8080/product/add/",{
            ...values
        }, {
            headers: {
                authorization: window.localStorage.getItem('bearer'),
            }
        })
        .then((addResponse) => {
            console.log(addResponse.data);
            dispatch(showBanner({apiSuccessResponse: "Product added ✔️"}));
            return navigate('/home');
        })
        .catch((addErr) => {
            console.log(addErr.response.data);
            dispatch(showBanner({apiErrorResponse: addErr.response?.data.message}));
            return navigate('/home');
        })
    } 

    const validateForm = (field, value) => {
        if(field === "productName" && value.length <= 7){
            setHasErrors(true);
            return "Product name must be greater than 7 characters"
        }
        if(field === "productDescription" && value.length > 40){
            setHasErrors(true);
            return "Product description must be less than 40 characters"
        }
        if(field === "productPrice" && parseFloat(value) <=0){
            setHasErrors(true);
            return "Product price must be greater than ₹0"
        }
        // if(field === "productQuantity" && parseInt(value) <=0){
        //     setHasErrors(true);
        //     return "Product quantity must be greater than 0"
        // } 
        else {
            setHasErrors(false);
        }
    }

    const handleInputChange = (e) => {
        const {name, value} = e.target;
        setValues({
            ...values,
            [name]: value,
        });

        setErrors({
            ...errors,
            [name]: validateForm(name, value),
        });
    }

    return (
        <div>
            <div className="col-md-5 m-auto">
            <form method="POST" onSubmit={handleFormSubmit}>
                <Card>
                    <h3 className="my-2">Add New Product</h3>
                    <div className="form-group">
                        <Formlabel
                            label="Product Name:"
                            htmlFor="productName"
                        />
                        <Input
                            placeholder="Please add product name"
                            name="productName"
                            value={values.productName}
                            handleChange={handleInputChange}
                        />
                        <FormHelperText>{errors.productName}</FormHelperText>
                    </div>

                    <div className="form-group">
                        <Formlabel
                            label="Product Description:"
                            htmlFor="productDescription"
                        />
                        <Input
                            placeholder="Please add product description"
                            name="productDescription"
                            value={values.productDescription}
                            handleChange={handleInputChange}
                            required={false}
                        />
                        <FormHelperText>{errors.productDescription}</FormHelperText>
                    </div>

                    <div className="form-group">
                        <Formlabel
                            label="Product Price:"
                            htmlFor="productPrice"
                        />
                        <Input
                            placeholder="Please add product price"
                            name="productPrice"
                            type="number"
                            value={values.productPrice}
                            handleChange={handleInputChange}
                        />
                        <FormHelperText>{errors.productPrice}</FormHelperText>
                    </div>

                    {/* <div className="form-group">
                        <Formlabel
                            label="Product Quantity:"
                            htmlFor="productQuantity"
                        />
                        <Input
                            placeholder="Please add product quantity"
                            name="productQuantity"
                            type="number"
                            value={values.productQuantity}
                            handleChange={handleInputChange}
                        />
                        <FormHelperText>{errors.productQuantity}</FormHelperText>
                    </div> */}

                    <div className="form-group">
                        <Formlabel
                            label="Product Status:"
                            htmlFor="productStatus"
                        />
                        <br />
                        <Input
                            name="productStatus"
                            type="checkbox"
                            checked={values.productStatus}
                            handleChange={(e) => {
                                setValues({
                                    ...values,
                                    'productStatus': !values.productStatus
                                })
                            }}
                            required={false}
                        />
                    </div>

                    <div className="form-group">
                        <Button type="submit" color="warning" disabled={hasErrors}>
                            <strong>Add Product</strong>
                        </Button>
                    </div>
                </Card>
            </form>
            </div>
        </div>
    );
};

export default AddProduct;
