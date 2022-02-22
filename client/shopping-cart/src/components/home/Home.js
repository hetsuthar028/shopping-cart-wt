import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import Productcard from '../product-card/ProductCard';
import SearchBar from '../search-bar/SearchBar';
import { showBanner } from '../../redux';
import { useNavigate } from 'react-router-dom';

const Home = () => {

    const [products, setProducts] = useState([]);
    const navigate = useNavigate();
    const dispatch = useDispatch();

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
            dispatch(showBanner({apiErrorResponse: err.response.data.message}));
            return navigate('/auth/login');
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
