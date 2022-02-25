import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import Button from "../shared/Button";
import Input from "../shared/Input";
import { useDispatch } from "react-redux";
import { showBanner } from '../../redux';
import FormHelperText from "../shared/FormHelperText";

const UsersList = () => {
    const [allUsers, setAllUsers] = useState([]);
    const [editIndex, setEditIndex] = useState(-1);
    const [editValues, setEditValues] = useState({});

    const [filteredUsers, setFilteredUsers] = useState([]);

    // Edit fields validation
    const [editErrors, setEditErrors] = useState({});
    const [hasErrors, setHasErrors] = useState(false);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const loadUsers = () => {
        axios
            .get("http://localhost:8080/user/get/all", {
                headers: {
                    authorization: window.localStorage.getItem("bearer"),
                },
            })
            .then((getResponse) => {
                setAllUsers(getResponse.data.users);
                setFilteredUsers(getResponse.data.users);
            })
            .catch((err) => {
                dispatch(showBanner({apiErrorResponse: err.response.data.message}));
                if(err.response.status === 403){
                    return navigate('/home');
                }
                return navigate('/auth/login');
            });
    };

    const validateForm = (name, value) => {
        if(name === "username" && value.length <= 5){
            setHasErrors(true);
            return "Invalid username";
        }
        if(name === "password" && value.length <= 8){
            setHasErrors(true);
            return "Password must be greater than 8 character";
        }
        else {
            setHasErrors(false);
        }
    }

    useEffect(() => {
        loadUsers();
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;

        setEditValues({
            ...editValues,
            [name]: value,
        });

        setEditErrors({
            ...editErrors,
            [name]: validateForm(name, value),
        })
    };

    const handleEditClick = (item, idx) => {
        setEditIndex(idx);
        setEditValues(item);
    };

    const handleEditSave = () => {
        let { _id, username, email, password, status, isAdmin } = editValues;

        axios
            .put(
                `http://localhost:8080/user/update/${email}`,
                {
                    username: username,
                    password: password,
                    status: status,
                },
                {
                    headers: {
                        authorization: window.localStorage.getItem("bearer"),
                    },
                }
            )
            .then((updateResp) => {
                console.log(updateResp.data);
                setEditIndex(-1);
                loadUsers();
            })
            .catch((err) => {
                console.log(err.response.data);
            });
    };

    const handleUserDelete = (userEmail) => {
        const confirmDelete = window.confirm("Are you sure you want to delete this user?");
        if(confirmDelete){
            axios.delete(`http://localhost:8080/user/delete/${userEmail}`, {
                headers: {
                    authorization: window.localStorage.getItem('bearer'),
                }
            })
            .then((deleteResp) => {
                console.log(deleteResp.data);
                loadUsers();
            })
            .catch((err) => {
                console.log(err.response.data);
            });
        }
    }

    const performUsersFilter = (e) => {
        const filterQuery = e.target.value.toString().toLowerCase();
        setFilteredUsers(allUsers.filter((user) => {
            if(user.email.toString().toLowerCase().indexOf(filterQuery) > -1){
                return true;
            }
        }))
    }

    return (
        <div>
            <div className="row m-0">
                <div className="col-md-12" style={{display: "flex", justifyContent: "space-between"}}>
                    <div className="text-start">
                        <Input handleChange={performUsersFilter} placeholder="Search users by email address" />
                    </div>
                    <div className="text-end">
                        <Link to="/admin/users/add">
                            <Button color="warning">Add New User</Button>
                        </Link>
                    </div>
                </div>
            </div>

            <div className="row m-0 mt-3">
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
                            {filteredUsers.map((user, idx) => {
                                return idx === editIndex ? (
                                    <tr key={idx} className="bg-secondary text-white">
                                        <td>
                                            <Input
                                                name="username"
                                                value={editValues.username}
                                                handleChange={handleInputChange}
                                            />
                                            <FormHelperText color="white">{editErrors.username}</FormHelperText>
                                        </td>
                                        <td>{editValues.email}</td>
                                        <td>
                                            <Input
                                                name="password"
                                                value={editValues.password}
                                                handleChange={handleInputChange}
                                            />
                                            <FormHelperText color="white">{editErrors.password}</FormHelperText>
                                        </td>
                                        <td>
                                            <Input
                                                type="checkbox"
                                                checked={editValues.status}
                                                handleChange={() => setEditValues({...editValues, status: !editValues.status})}
                                            />
                                        </td>
                                        <td>No</td>
                                        <td>
                                            <div>
                                                <Button
                                                    color="warning"
                                                    className="my-1"
                                                    handleClick={handleEditSave}
                                                    disabled={hasErrors}
                                                >
                                                    Save
                                                </Button>
                                                <Button
                                                    color="warning"
                                                    style={{ margin: "10px" }}
                                                    handleClick={() => {
                                                        setEditIndex(-1);
                                                        setEditValues({});
                                                    }}
                                                >
                                                    Reset
                                                </Button>
                                            </div>
                                        </td>
                                        <td>
                                            <Button color="warning" handleClick={() => handleUserDelete(editValues.email)}>❌</Button>
                                        </td>
                                    </tr>
                                ) : (
                                    <tr key={idx}>
                                        <td>@{user.username}</td>
                                        <td>{user.email}</td>
                                        <td>{user.password}</td>
                                        <td>
                                            <Input
                                                type="checkbox"
                                                checked={user.status}
                                            />
                                        </td>
                                        <td>{user.isAdmin ? "YES" : "NO"}</td>
                                        <td>
                                            <Button
                                                color="success"
                                                handleClick={() =>
                                                    handleEditClick(user, idx)
                                                }
                                            >
                                                ✏️
                                            </Button>
                                        </td>
                                        <td>
                                            <Button color="warning" handleClick={() => handleUserDelete(user.email)}>❌</Button>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default UsersList;
