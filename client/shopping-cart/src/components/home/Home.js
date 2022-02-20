import axios from 'axios';
import React, { useState, useEffect } from 'react';
import Productcard from '../product-card/ProductCard';
import SearchBar from '../search-bar/SearchBar';

const Home = () => {

    const [products, setProducts] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:8080/product/get/all", {
            headers: {
                authorization: window.localStorage.getItem('bearer'),
            }
        })
        .then((response) => {
            console.log(response.data);
            setProducts(response.data.products);
        })
        .catch((err) => {
            console.log(err.response.data)
        });
    }, []);

    return (
        <div>
            <div className='row m-0 p-2'>
                <div className='col-md-12 m-auto'>
                    <div className='search-bar'>
                        <SearchBar />
                    </div>
                    <div className='card-list'>
                        {products.map((item) => (
                            <Productcard product={item} key={item._id}/>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Home;
