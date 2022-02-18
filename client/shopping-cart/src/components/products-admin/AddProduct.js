import React, { useState } from "react";
import Button from "../shared/Button";
import Card from "../shared/Card";
import Formlabel from "../shared/FormLabel";
import Input from "../shared/Input";

const AddProduct = (props) => {
    const [productName, setProductName] = useState("");
    const [productDescription, setProductDescription] = useState("");
    const [productPrice, setProductPrice] = useState("");
    const [productQuantity, setProductQuantity] = useState("");
    const [productStatus, setProductStatus] = useState(false);


    const handleFormSubmit = (e) => {
        e.preventDefault();
        console.log(productDescription, productName, productPrice, productQuantity, productStatus)
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
                            value={productName}
                            handleChange={(e) => setProductName(e.target.value)}
                        />
                    </div>

                    <div className="form-group">
                        <Formlabel
                            label="Product Description:"
                            htmlFor="productDescription"
                        />
                        <Input
                            placeholder="Please add product description"
                            name="productDescription"
                            value={productDescription}
                            handleChange={(e) =>
                                setProductDescription(e.target.value)
                            }
                        />
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
                            value={productPrice}
                            handleChange={(e) =>
                                setProductPrice(e.target.value)
                            }
                        />
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
                            value={productQuantity}
                            handleChange={(e) =>
                                setProductQuantity(e.target.value)
                            }
                        />
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
                            checked={productStatus}
                            handleChange={(e) => {
                                setProductStatus((status) => !status);
                            }}
                            required={false}
                        />
                    </div>

                    <div className="form-group">
                        <Button type="submit" color="warning">
                            <strong>Add Product</strong>
                        </Button>
                    </div>
                </Card>
            </form>
        </div>
    );
};

export default AddProduct;
