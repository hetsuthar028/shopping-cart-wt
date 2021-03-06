import React from "react";
import { Route, Routes } from "react-router-dom";
import Login from "../components/auth/Login";
import SignUp from "../components/auth/SignUp";
import Cart from "../components/cart/Cart";
import AdminHome from "../components/admin/AdminHome";
import AdminProducts from "../components/admin/AdminProducts";
import AddProduct from "../components/products-admin/AddProduct";
import Productlist from "../components/products-admin/ProductList";
import Home from "../components/home/Home";
import AdminUsers from "../components/admin/AdminUsers";
import UsersList from "../components/users/UsersList";
import { useSelector } from "react-redux";
import Banner from "../components/banner/Banner";
import AdminMaterialReceipts from "../components/admin/AdminMaterialReceipts";
import MRList from "../components/material-receipt/MRList";
import AddMR from "../components/material-receipt/AddMR";
import MaterialReceipt from "../components/material-receipt/MaterialReceipt";
import ErrorPage from "../components/error/ErrorPage";
import WelcomePage from "../components/welcome/WelcomePage";
import MyOrders from "../components/orders/MyOrders";
import AdminSales from "../components/admin/AdminSales";

const AppRouter = () => {
    const bannerState = useSelector((state) => state.banner);

    return (
        <>
            {bannerState.showBanner && (
                <Banner
                    message={
                        bannerState.apiErrorResponse ||
                        bannerState.apiSuccessResponse
                    }
                    error={bannerState.apiSuccessResponse === undefined}
                />
            )}

            <Routes>
                <Route path="/" element={<WelcomePage />} />
                
                <Route path="/auth/login" element={<Login />} />
                
                <Route path="/auth/signup" element={<SignUp />} />
                
                <Route path="/home" element={<Home />} />
                
                <Route path="/my/cart" element={<Cart />} />
                
                <Route path="/my/orders" element={<MyOrders />} />
                
                <Route path="/admin" element={<AdminHome />} />

                <Route path="/admin/products" element={<AdminProducts />}>
                    <Route path="add" element={<AddProduct />} />
                    <Route index element={<Productlist />} />
                </Route>

                <Route path="/admin/users" element={<AdminUsers />}>
                    <Route path="add" element={<SignUp />} />
                    <Route index element={<UsersList />} />
                </Route>

                <Route path="/admin/mr" element={<AdminMaterialReceipts />}>
                    <Route path="add" element={<AddMR />} />
                    <Route index element={<MRList />} />
                    <Route path=":number" element={<MaterialReceipt />} />
                </Route>

                <Route path="/admin/sales" element={<AdminSales />} />

                <Route path="*" element={<ErrorPage />} />
            </Routes>
        </>
    );
};

export default AppRouter;
