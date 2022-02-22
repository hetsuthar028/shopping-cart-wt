import React from 'react';
import { Outlet } from 'react-router-dom';

const AdminMaterialReceipts = () => {
    return (
        <div>
            <div className='row m-0 mt-3'>
                <div className='col-md-12 m-auto'>
                    <h2>Material Receipts (Inwards)</h2>
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

export default AdminMaterialReceipts;
