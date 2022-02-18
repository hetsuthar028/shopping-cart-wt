import React from "react";

const Navbar = () => {
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
                        <li className="nav-item">
                            <a className="nav-link active">Cart</a>
                        </li>

                        <li className="nav-item">
                            <a className="nav-link active">Products</a>
                        </li>

                        <li className="nav-item">
                            <a className="nav-link active">Users</a>
                        </li>

                        <li className="nav-item">
                            <a className="nav-link active">MR Inward</a>
                        </li>

                        <li className="nav-item">
                            <a className="nav-link active">Logout</a>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
