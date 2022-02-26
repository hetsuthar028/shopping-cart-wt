import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { fetchUser } from "../../redux/";

const Navbar = () => {
    const currentState = useSelector((state) => state.user);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchUser());
    }, []);

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <div className="container-fluid">
                <Link className="navbar-brand" to="/home">
                    Shopify
                </Link>
                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarNav"
                    aria-controls="navbarNav"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div
                    className="collapse navbar-collapse justify-content-end"
                    id="navbarNav"
                >
                    <ul className="navbar-nav">
                        {currentState.error?.message ||
                        Object.keys(currentState.user).length == 0 ? (
                            <>
                                <li className="nav-item">
                                    <Link
                                        to="/auth/login"
                                        className="nav-link active"
                                    >
                                        Login
                                    </Link>
                                </li>
                                <li className="nav-item">
                                    <Link
                                        to="/auth/signup"
                                        className="nav-link active"
                                    >
                                        Sign Up
                                    </Link>
                                </li>
                            </>
                        ) : (
                            <>
                                <li className="nav-item">
                                    <Link
                                        to="/home"
                                        className="nav-link active"
                                    >
                                        Home
                                    </Link>
                                </li>

                                {currentState.user.isAdmin ? (
                                    <>
                                        <li className="nav-item">
                                            <Link
                                                to="/admin/products"
                                                className="nav-link active"
                                            >
                                                Products
                                            </Link>
                                        </li>

                                        <li className="nav-item">
                                            <Link
                                                to="/admin/users"
                                                className="nav-link active"
                                            >
                                                Users
                                            </Link>
                                        </li>

                                        <li className="nav-item">
                                            <Link
                                                to="/admin/sales"
                                                className="nav-link active"
                                            >
                                                Sales
                                            </Link>
                                        </li>

                                        <li className="nav-item">
                                            <Link
                                                to="/admin/mr"
                                                className="nav-link active"
                                            >
                                                MR Inward
                                            </Link>
                                        </li>
                                    </>
                                ) : (
                                    <>
                                        <li className="nav-item">
                                            <Link
                                                to="/my/cart"
                                                className="nav-link active"
                                            >
                                                My Cart
                                            </Link>
                                        </li>

                                        <li className="nav-item">
                                            <Link
                                                to="/my/orders"
                                                className="nav-link active"
                                            >
                                                My Orders
                                            </Link>
                                        </li>
                                    </>
                                )}
                                <li className="nav-item">
                                    <Link
                                        to="/auth/login"
                                        className="nav-link active"
                                    >
                                        Logout
                                    </Link>
                                </li>
                            </>
                        )}
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
