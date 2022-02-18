import React, { useState } from "react";
import Button from "../shared/Button";
import Card from "../shared/Card";
import Formlabel from "../shared/FormLabel";
import Input from "../shared/Input";
import FormHelperText from "../shared/FormHelperText";

const initialValues = {
    productName: '',
    productDescription: '',
    productPrice: '',
    productQuantity: '',
    productStatus: false,
}

const AddProduct = (props) => {

    const [values, setValues] = useState(initialValues);
    const [errors, setErrors] = useState({});
    const [hasErrors, setHasErrors] = useState(true);

    const handleFormSubmit = (e) => {
        e.preventDefault();
        console.log(values);
    }

    const validateForm = (field, value) => {
        if(field === "productName" && value.length <= 7){
            setHasErrors(true);
            return "Product name must be greater than 7 characters"
        }
        if(field === "productDescription" && (value.length <= 12 || value.length > 40)){
            setHasErrors(true);
            return "Product description must be 12 to 40 characters long"
        }
        if(field === "productPrice" && parseFloat(value) <=0){
            setHasErrors(true);
            return "Product price must be greater than ₹0"
        }
        if(field === "productQuantity" && parseInt(value) <=0){
            setHasErrors(true);
            return "Product quantity must be greater than 0"
        } else {
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

                    <div className="form-group">
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
                    </div>

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
    );
};

export default AddProduct;
