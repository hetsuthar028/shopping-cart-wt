import React from "react";
import Button from "../shared/Button";
import Input from "../shared/Input";

const AllUsers = () => {
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
                            <tr>
                                <td>@hetsuthar028</td>
                                <td>hetmewada028@gmail.com</td>
                                <td>************</td>
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
                            {[1, 2, 3, 4].map((item, idx) => (
                                <tr key={idx}>
                                    <td>@hetsuthar028</td>
                                    <td>hetmewada028@gmail.com</td>
                                    <td>************</td>
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
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default AllUsers;
