import axios from "axios";
import React, { useEffect, useState } from "react";
import Button from "../shared/Button";
import Input from "../shared/Input";

const AllUsers = () => {

    const [allUsers, setAllUsers] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:8080/user/get/all", {
            headers: {
                authorization: window.localStorage.getItem('bearer'),
            }
        })
        .then((getResponse) => {
            setAllUsers(getResponse.data.users);
            console.log(getResponse.data);
        })
        .catch((err) => {
            console.log(err.response.data);
        })
    }, []);

    return (
        <div>
            <div className="row m-0">
                <div className="col-md-12">
                    <table className="table">
                        <thead className="table-success">
                            <tr>
                                <th>Username</th>
                                <th>Email</th>
                                <th>Password</th>
                                <th>Status</th>
                                <th>Admin rights</th>
                                <th>Edit</th>
                                <th>Delete</th>
                            </tr>
                        </thead>
                        <tbody>
                            
                            {allUsers.map((user, idx) => (
                                <tr key={idx}>
                                    <td>@{user.username}</td>
                                    <td>{user.email}</td>
                                    <td>{user.password}</td>
                                    <td>
                                        <Input type="checkbox" checked={user.status} />
                                    </td>
                                    <td>{user.isAdmin ? "YES": "NO"}</td>
                                    <td>
                                        <Button color="success">✏️</Button>
                                    </td>
                                    <td>
                                        <Button color="warning">❌</Button>
                                    </td>
                                </tr>
                            ))}
                            <tr>
                                <td>@hetsuthar028</td>
                                <td>hetmewada028@gmail.com</td>
                                <td>
                                    <Input value="helloworld" />
                                </td>
                                <td>
                                    <Input type="checkbox" />
                                </td>
                                <td>No</td>
                                <td>
                                    <Button color="success">✏️</Button>
                                </td>
                                <td>
                                    <Button color="warning">❌</Button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default AllUsers;
