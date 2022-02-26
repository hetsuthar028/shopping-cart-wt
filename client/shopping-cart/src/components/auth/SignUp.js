import React, { useState } from "react";
import Button from "../shared/Button";
import Card from "../shared/Card";
import Formlabel from "../shared/FormLabel";
import Input from "../shared/Input";
import FormHelperText from "../shared/FormHelperText";
import axios from "axios";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { showBanner } from "../../redux";

const initialValues = {
    email: "",
    username: "",
    password: "",
    cnfPassword: "",
};
const emailRegExp =
    /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

const SignUp = (props) => {
    const [values, setValues] = useState(initialValues);
    const [errors, setErrors] = useState({});
    const [hasErrors, setHasErrors] = useState(true);

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const location = useLocation();

    const handleFormSubmit = (e) => {
        e.preventDefault();

        axios
            .post("http://localhost:8080/user/auth/signup", {
                email: values.email,
                password: values.password,
                status: true,
                isAdmin: false,
                username: values.username,
            })
            .then((signupResp) => {
                dispatch(
                    showBanner({
                        apiSuccessResponse: "Account created successfully!",
                    })
                );

                // If path contains admin then redirect to the admin users list page
                if (location.pathname.toString().indexOf("admin") > -1) {
                    return navigate("/admin/users");
                }

                // Else this has to be the Sign up page and redirect to the Login
                return navigate("/auth/login");
            })
            .catch((err) => {
                return dispatch(
                    showBanner({ apiErrorResponse: err.response.data.message })
                );
            });
    };

    const validateForm = (field, value) => {
        if (field === "email" && !emailRegExp.test(value.toLowerCase())) {
            setHasErrors(true);
            return "Invalid email address";
        }
        if (field === "username" && value.length <= 5) {
            setHasErrors(true);
            return "Username must contains more than 5 characters";
        }
        if (field === "password" && value.length <= 8) {
            setHasErrors(true);
            return "Password must be greater than 8 characters";
        }
        if (field === "cnfPassword" && value != values.password) {
            setHasErrors(true);
            return "Confirm Password does not match";
        } else {
            setHasErrors(false);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setValues({
            ...values,
            [name]: value,
        });

        setErrors({
            ...errors,
            [name]: validateForm(name, value),
        });
    };

    return (
        <div>
            <div className="row m-0">
                <div className="col-md-5 m-auto mt-5">
                    <form method="POST" onSubmit={handleFormSubmit}>
                        <Card>
                            <div className="form-group">
                                <Formlabel
                                    htmlFor="email"
                                    label="Email Address:"
                                />
                                <Input
                                    placeholder="Please enter email address"
                                    type="email"
                                    name="email"
                                    value={values.email}
                                    handleChange={handleInputChange}
                                />
                                <FormHelperText>{errors.email}</FormHelperText>
                            </div>

                            <div className="form-group">
                                <Formlabel
                                    htmlFor="username"
                                    label="Username:"
                                />
                                <Input
                                    placeholder="Please enter username"
                                    name="username"
                                    value={values.username}
                                    handleChange={handleInputChange}
                                />
                                <FormHelperText>
                                    {errors.username}
                                </FormHelperText>
                            </div>

                            <div className="form-group">
                                <Formlabel
                                    htmlFor="password"
                                    label="Password:"
                                />
                                <Input
                                    placeholder="Please enter password"
                                    type="password"
                                    name="password"
                                    value={values.password}
                                    handleChange={handleInputChange}
                                />
                                <FormHelperText>
                                    {errors.password}
                                </FormHelperText>
                            </div>

                            <div className="form-group">
                                <Formlabel
                                    htmlFor="cnfPassword"
                                    label="Confirm Password:"
                                />
                                <Input
                                    placeholder="Please enter password"
                                    type="password"
                                    name="cnfPassword"
                                    value={values.cnfPassword}
                                    handleChange={handleInputChange}
                                />
                                <FormHelperText>
                                    {errors.cnfPassword}
                                </FormHelperText>
                            </div>

                            <div className="form-group">
                                <Button
                                    type="submit"
                                    color="success"
                                    disabled={hasErrors}
                                >
                                    Sign Up
                                </Button>
                            </div>
                            {!(
                                location.pathname.toString().indexOf("admin") >
                                -1
                            ) && (
                                <div className="form-group">
                                    <p>
                                        Already have an account?{" "}
                                        <Link to="/auth/login">Login here</Link>
                                    </p>
                                </div>
                            )}
                        </Card>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default SignUp;
