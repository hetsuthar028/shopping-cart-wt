import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Login from '../components/auth/Login';
import SignUp from '../components/auth/SignUp';
import Cart from '../components/cart/Cart';
import AdminHome from '../components/admin/AdminHome';
import AdminProducts from '../components/admin/AdminProducts';
import AddProduct from '../components/products-admin/AddProduct';
import Productlist from '../components/products-admin/ProductList';
import Home from '../components/home/Home';
import AdminUsers from '../components/admin/AdminUsers';
import UsersList from '../components/users/UsersList';

const AppRouter = () => {
    return (
        <Routes>
            <Route path='/auth/login' element={<Login />} />
            <Route path='/auth/signup' element={<SignUp />} />
            <Route path='/home' element={<Home />} />
            <Route path='/my/cart' element={<Cart />} />
            <Route path="/admin" element={<AdminHome />} />
            <Route path="/admin/products" element={<AdminProducts />}>
                <Route path="add" element={<AddProduct />} />
                <Route index element={<Productlist />} />
            </Route>
            <Route path='/admin/users' element={<AdminUsers />}>
                <Route path='add' element={<SignUp />} />
                <Route index element={<UsersList />} />
            </Route>

        </Routes>
    );
}

export default AppRouter;