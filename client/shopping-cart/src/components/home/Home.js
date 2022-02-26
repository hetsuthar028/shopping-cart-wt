import axios from "axios";
import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import Productcard from "../product-card/ProductCard";
import SearchBar from "../search-bar/SearchBar";
import { showBanner } from "../../redux";
import { useNavigate } from "react-router-dom";

const Home = () => {
    const [products, setProducts] = useState([]);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [filteredProducts, setFilteredProducts] = useState([]);

    useEffect(() => {
        axios
            .get("http://localhost:8080/product/get/all", {
                headers: {
                    authorization: window.localStorage.getItem("bearer"),
                },
            })
            .then((response) => {
                setProducts(response.data.products);
                setFilteredProducts(response.data.products);
            })
            .catch((err) => {
                dispatch(
                    showBanner({ apiErrorResponse: err.response.data.message })
                );
                return navigate("/auth/login");
            });
    }, []);

    const performSearch = (e) => {
        e.preventDefault();

        setFilteredProducts(
            products.filter((product) => {
                if (
                    product.name
                        .toLowerCase()
                        .indexOf(e.target.value.toLowerCase()) != -1
                ) {
                    return true;
                }
            })
        );
    };

    return (
        <div>
            <div className="row m-0 p-2">
                <div className="col-md-12 m-auto">
                    <div className="search-bar">
                        <SearchBar performSearch={performSearch} />
                    </div>
                    <div className="card-list">
                        {filteredProducts.map((item) => (
                            <Productcard product={item} key={item._id} />
                        ))}
                        {filteredProducts.length === 0 && (
                            <h5>No products found!</h5>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;
