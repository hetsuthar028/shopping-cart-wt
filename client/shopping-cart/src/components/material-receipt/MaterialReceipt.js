import React, { useState, useEffect } from "react";
import Button from "../shared/Button";
import Formlabel from "../shared/FormLabel";
import Card from "../shared/Card";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { showBanner } from "../../redux";

const MaterialReceipt = () => {
    const [totalProducts, setTotalProducts] = useState(1);
    const [materialReceipt, setMaterialReceipt] = useState({});
    
    // const userState = useSelector((state) => state.user.user);

    const location = useLocation();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        let mrNumber = location.pathname.split('/')[3]

        if(mrNumber){
            axios.get(`http://localhost:8080/materialReceipt/get/id/${mrNumber}`, {
                headers: {
                    authorization: window.localStorage.getItem('bearer'),
                }
            })
            .then((getResp) => {
                setMaterialReceipt(getResp.data.receipt)
                // setTotalProducts(getResp.data.receipt.products.length);
            })
            .catch((err) => {
                dispatch(showBanner({apiErrorResponse: err.response.data.message}));
                return navigate('/admin/mr');
            })
        }
        
    }, []);

    const handleFormSubmit = (e) => {
        e.preventDefault();
    };

    const handleMRDelete = () => {
        let confirmDelete = window.confirm("Are you sure you want to delete this Material Receipt?");
        if(confirmDelete){
            axios.delete(`http://localhost:8080/materialReceipt/delete/id/${materialReceipt.mrNo}`, {
                headers: {
                    authorization: window.localStorage.getItem("bearer"),
                }
            })
            .then((deleteResp) => {
                dispatch(showBanner({apiSuccessResponse: "Material Receipt deleted successfully!"}))
                return navigate('/admin/mr');
            })
            .catch((err) => {
                dispatch(showBanner({apiErrorResponse: err.response.data.message}));
                if(err.response.status === 403){
                    return navigate('/home')
                }
                else if(err.response.status == 401){
                    return navigate('/auth/login');
                }
                return navigate('/admin/mr/');
            })
        }
    }

    const getGrandTotal = () => {
        return materialReceipt.products?.reduce((prev, product) => {
            return prev += product.totalAmt;
        }, 0);
    }

    return (
        <div>
            <div className="col-md-11 m-auto">
                <form method="POST" onSubmit={handleFormSubmit}>
                    <Card>
                        <div className="row m-0">
                            <h3>Material Receipt</h3>
                        </div>
                        <div className="row m-0">
                            <div className="form-group text-end">
                                <Button color="warning" handleClick={() => navigate('/admin/mr/add', {state: materialReceipt})}>✏️</Button>
                                <Button color="info" handleClick={handleMRDelete}>❌</Button>
                            </div>
                        </div>
                        <div className="row m-0 mt-3">
                            <div className="col-md-4 p-1 m-auto">
                                <div className="form-group">
                                    <Formlabel
                                        htmlFor="mrDate"
                                        label="MR Date:"
                                    />
                                    <div>
                                        <h5>{new Date(materialReceipt.mrDate).toDateString()}</h5>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-4 p-1 m-auto">
                                <div className="form-group">
                                    <Formlabel
                                        htmlFor="mrNo"
                                        label="MR Number:"
                                    />
                                    <div>
                                        <h5>{materialReceipt.mrNo}</h5>
                                    </div>
                                </div>
                            </div>

                            <div className="col-md-10 p-1 m-auto">
                                <div className="form-group">
                                    <Formlabel
                                        htmlFor="supplier"
                                        label="Supplier:"
                                    />
                                    <div>
                                        <h5>{materialReceipt.supplier}</h5>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="row m-0 mt-3">
                            <table className="table">
                                <thead>
                                    <tr>
                                        <th>Product Name</th>
                                        <th>Quantity</th>
                                        <th>Rate (Price)</th>
                                        <th>Total Amount</th>
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {materialReceipt.products?.map((product, idx) => (
                                        <tr key={idx}>
                                            <td>{product?.productId?.name}</td>
                                            <td>{product.quantity}</td>
                                            <td>{product.rate}</td>
                                            <td>{product.totalAmt}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        <div className="row m-0 mt-3">
                            <h3>Grand Total: ₹{getGrandTotal()}</h3>
                        </div>
                    </Card>
                </form>
            </div>
        </div>
    );
};

export default MaterialReceipt;
