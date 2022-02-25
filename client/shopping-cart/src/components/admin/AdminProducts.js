import React from 'react';
import Button from '../shared/Button';
import { Outlet } from 'react-router-dom';

const AdminProducts = () => {
    return (
        <div>
            <div className='row m-0 mt-3'>
                <div className='col-md-12 m-auto'>
                    <h2>Products</h2>
                </div>
            </div>

            <div className='row m-0 mt-3'>
                <div className='col-md-12'>
                    <Outlet />
                </div>
            </div>
        </div>
    );
}

export default AdminProducts;
