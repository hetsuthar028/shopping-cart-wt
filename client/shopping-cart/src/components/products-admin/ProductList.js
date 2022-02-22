import axios from "axios";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import Button from "../shared/Button";
import Input from "../shared/Input";
import { showBanner } from '../../redux';

const Productlist = (props) => {
    const [products, setProducts] = useState([]);
    const [editIndex, setEditIndex] = useState(-1);
    const [editValues, setEditValues] = useState({});

    const dispath = useDispatch();
    const navigate = useNavigate();
    const userState = useSelector((state) => state.user.user);

    const loadProducts = () => {
        axios
        .get("http://localhost:8080/product/get/all", {
            headers: {
                authorization: window.localStorage.getItem("bearer"),
            },
        })
        .then((getResponse) => {
            setProducts(getResponse.data.products);
        })
        .catch((err) => {
            dispath(showBanner({apiErrorResponse: err.response.data.message}));
        });
    }

    useEffect(() => {
        if(!userState.isAdmin){
            dispath(showBanner({apiErrorResponse: "Unauthorized user"}));
            return navigate('/home')
        }
        loadProducts();
    }, []);

    const handleProductEdit = (item, idx) => {
        setEditValues(item);
        setEditIndex(idx);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;

        setEditValues({
            ...editValues,
            [name]: value,
        });
    };

    const handleEditSave = () => {
        const { _id, name, description, price, quantity, status } = editValues;
        setEditIndex(-1);

        axios
            .put(
                `http://localhost:8080/product/update/id/${editValues._id}`,
                {
                    name,
                    description,
                    price,
                    quantity,
                    status,
                },
                {
                    headers: {
                        authorization: window.localStorage.getItem("bearer"),
                    },
                }
            )
            .then((updateResp) => {
                console.log(updateResp.data);
                loadProducts();
            })
            .catch((err) => {
                console.log(err.response.data);
            });
    };

    const handleProductDelete = (productId) => {
        let getConfirm = window.confirm("Are you sure you want to delete this product?")
        if(getConfirm){
            axios.delete(`http://localhost:8080/product/delete/id/${productId}`, {headers: {
                authorization: window.localStorage.getItem('bearer'),
            }})
            .then((deleteResp) => {
                console.log(deleteResp.data);
                loadProducts();
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
                    <div className="text-end">
                        <Link to="/admin/products/add">
                            <Button color="warning">Add New Product</Button>
                        </Link>
                    </div>
                </div>
            </div>
            <div className="row m-0 mt-3">
                <div className="col-md-12">
                    {/* <h2 className='my-3'>Products</h2> */}
                    <table className="table tables-striped">
                        <thead className="table-dark">
                            <tr>
                                <th></th>
                                <th>Product</th>
                                <th>Description</th>
                                <th>Price</th>
                                <th>Quantity</th>
                                <th>Status</th>
                                <th>Edit</th>
                                <th>Delete</th>
                            </tr>
                        </thead>
                        <tbody>
                            {products.map((product, idx) => {
                                return editIndex === idx ? (
                                    <tr
                                        className="bg-secondary text-white"
                                        key={idx}
                                    >
                                        <td>{idx + 1}</td>
                                        <td>
                                            <Input
                                                name="name"
                                                value={editValues.name}
                                                handleChange={handleInputChange}
                                            />
                                        </td>
                                        <td>
                                            <Input
                                                name="description"
                                                value={editValues.description}
                                                handleChange={handleInputChange}
                                            />
                                        </td>
                                        <td>
                                            <Input
                                                name="price"
                                                value={editValues.price}
                                                handleChange={handleInputChange}
                                            />
                                        </td>
                                        <td>
                                            <Input
                                                name="quantity"
                                                value={editValues.quantity}
                                                handleChange={handleInputChange}
                                            />
                                        </td>
                                        <td>
                                            <Input
                                                type="checkbox"
                                                name="productStatus"
                                                checked={editValues.status}
                                                handleChange={() => {setEditValues({...editValues, status: !editValues.status})}}
                                            />
                                        </td>
                                        <td>
                                            <div>
                                                <Button
                                                    color="warning"
                                                    className="my-1"
                                                    handleClick={handleEditSave}
                                                >
                                                    Save
                                                </Button>
                                                <Button
                                                    color="warning"
                                                    style={{ margin: "10px" }}
                                                    handleClick={() => {
                                                        setEditIndex(-1);
                                                        setEditValues({});
                                                    }}
                                                >
                                                    Reset
                                                </Button>
                                            </div>
                                        </td>

                                        <td>
                                            <Button color="warning" handleClick={() => handleProductDelete(editValues._id)}>❌</Button>
                                        </td>
                                    </tr>
                                ) : (
                                    <tr key={idx}>
                                        <td>{idx + 1}</td>
                                        <td>{product.name}</td>
                                        <td>
                                            {product.description.slice(0, 30) +
                                                "..."}
                                        </td>
                                        <td>₹ {product.price}</td>
                                        <td>{product.quantity}</td>
                                        <td>
                                            <Input
                                                type="checkbox"
                                                name="productStatus"
                                                checked={product.status}
                                            />
                                        </td>
                                        <td>
                                            <Button
                                                color="info"
                                                handleClick={() =>
                                                    handleProductEdit(
                                                        product,
                                                        idx
                                                    )
                                                }
                                            >
                                                ✏️
                                            </Button>
                                        </td>
                                        <td>
                                            <Button color="warning" handleClick={() => handleProductDelete(product._id)}>❌</Button>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default Productlist;
