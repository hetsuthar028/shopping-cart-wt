import axios from "axios";
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Button from "../shared/Button";
import Card from "../shared/Card";
import Input from "../shared/Input";
import dummyImage from "../../static/receipt-76-454913.png";
import { useDispatch } from "react-redux";
import { showBanner } from '../../redux';

const MRList = () => {
    const [materialReceipts, setMaterialReceipts] = useState([]);
    const [filteredMRs, setFilteredMRs] = useState([]);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        axios
            .get("http://localhost:8080/materialreceipt/get/all", {
                headers: {
                    authorization: window.localStorage.getItem("bearer"),
                },
            })
            .then((resp) => {
                console.log(resp.data.result);
                setMaterialReceipts(resp.data.result);
                setFilteredMRs(resp.data.result);
            })
            .catch((err) => {
                console.log(err.response.data);
                dispatch(showBanner({apiErrorResponse: err.response?.data.message}));
                if(err.response.status === 403){
                    return navigate('/home');
                }
                return navigate('/auth/login');
            });
    }, []);

    const performMRFilter = (e) => {
        let filterQuery = e.target.value.toString().toLowerCase();
        setFilteredMRs(materialReceipts.filter((receipt) => {
            if((receipt.supplier.toString().toLowerCase().indexOf(filterQuery) > -1) || (receipt.mrNo.toString().toLowerCase().indexOf(filterQuery) > -1)){
                return true;
            }
        }))
    }

    return (
        <div>
            <div className="row m-0">
                <div className="col-md-12" style={{display: 'flex', justifyContent: 'space-between'}}>
                    <div className="text-start">
                        <Input placeholder="Search by supplier or number" handleChange={performMRFilter} />
                    </div>
                    <div className="text-end">
                        <Link to="/admin/mr/add">
                            <Button color="warning">
                                Add New Material Receipt
                            </Button>
                        </Link>
                    </div>
                </div>
            </div>

            <div className="row m-0 mt-3">
                <div className="col-md-12">
                    {filteredMRs.map((mr, idx) => (
                        <div style={{ display: "inline-flex" }} key={idx}>
                            <Card
                                style={{
                                    minWidth: "300px",
                                    maxWidth: "300px",
                                    margin: "10px",
                                    cursor: "pointer",
                                }}
                                onClick={() => navigate(`/admin/mr/${mr.mrNo}`)}
                            >
                                <div className="m-auto">
                                    <img
                                        // src='https://source.unsplash.com/random'
                                        src={dummyImage}
                                        style={{
                                            height: "70px",
                                            width: "70px",
                                        }}
                                    />
                                </div>
                                <div className="mt-3">
                                    <h5>MR No: {mr.mrNo}</h5>
                                    <div className="mt-2">
                                        Supplier:{" "}
                                        <h6 style={{ display: "inline" }}>
                                            {mr.supplier}
                                        </h6>
                                    </div>
                                    <div className="mt-2">
                                        Date:{" "}
                                        <h6 style={{ display: "inline" }}>
                                            {new Date(mr.mrDate).toDateString()}
                                        </h6>{" "}
                                    </div>
                                    <div className="mt-2">
                                        Products:{" "}
                                        <h6 style={{ display: "inline" }}>{
                                            mr.products.length
                                        }</h6>{" "}
                                    </div>
                                </div>
                            </Card>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default MRList;
