import React, { useState } from 'react';
import Button from '../shared/Button';
import Input from '../shared/Input';

const Productlist = (props) => {
    return (
        <div>
            <div className='row m-0'>                
                <div className='col-md-12'>
                    <h2 className='my-3'>Products</h2>
                    <table className='table tables-striped'>
                        <thead className='table-dark'>
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
                            {[1, 2, 3, 4, 5].map((item, idx) => (
                                <tr key={idx}>
                                <td>{idx + 1}</td>
                                <td>Amazon Alexa</td>
                                <td>{"Lorem IpsumLorem IpsumLorem IpsumLorem IpsumLorem IpsumLorem Ipsum".slice(0, 30) + "..."}</td>
                                <td>₹5,999</td>
                                <td>120</td>
                                <td><Input type="checkbox" name="productStatus" /></td>
                                <td><Button color="info">✏️</Button></td>
                                <td><Button color="warning">❌</Button></td>
                            </tr>
                            ))}
                            
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default Productlist;
