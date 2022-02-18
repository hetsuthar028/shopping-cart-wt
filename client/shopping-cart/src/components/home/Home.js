import React from 'react';
import Productcard from '../product-card/ProductCard';
import SearchBar from '../search-bar/SearchBar';

const Home = () => {
    return (
        <div>
            <div className='row m-0 p-2'>
                <div className='col-md-12 m-auto'>
                    <div className='search-bar'>
                        <SearchBar />
                    </div>
                    <div className='card-list'>
                        {[1, 2, 3, 4, 5, 6].map((item) => (
                            <Productcard />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Home;
