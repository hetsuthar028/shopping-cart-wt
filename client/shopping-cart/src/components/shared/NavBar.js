import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import fetchUser from "../../redux/user/userActions";

const Navbar = () => {
    const currentState = useSelector((state) => state);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchUser());
    }, []);

    console.log("INSIDE NAV", currentState);

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <div className="container-fluid">
                <a className="navbar-brand" href="#">
                    Shopify
                </a>
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
                        {currentState.error?.message ? (
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
                                        to="/my/cart"
                                        className="nav-link active"
                                    >
                                        My Cart
                                    </Link>
                                </li>

                                {/* <li className="nav-item">
                                    <Link to="/" className="nav-link active">My Orders</Link>
                                </li> */}

                                {currentState.user.isAdmin && (
                                    <>
                                        <li className="nav-item">
                                            <Link to="/admin/products" className="nav-link active">
                                                Products
                                            </Link>
                                        </li>

                                        <li className="nav-item">
                                            <Link to="/admin/users" className="nav-link active">
                                                Users
                                            </Link>
                                        </li>

                                        <li className="nav-item">
                                            <a className="nav-link active">
                                                MR Inward
                                            </a>
                                        </li>
                                    </>
                                )}
                                <li className="nav-item">
                                    <Link to="/auth/login" className="nav-link active">Logout</Link>
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
