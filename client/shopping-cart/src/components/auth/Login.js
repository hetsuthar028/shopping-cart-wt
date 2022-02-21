import React, { useState, useEffect } from "react";
import Card from "../shared/Card";
import Formlabel from "../shared/FormLabel";
import Input from "../shared/Input";
import Button from "../shared/Button";
import FormHelperText from "../shared/FormHelperText";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import fetchUser from "../../redux/user/userActions";

const initialValues = {
    email: "",
    password: "",
}

const emailRegExp = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

const Login = (props) => {
    const [values, setValues] = useState(initialValues);
    const [hasErrors, setHasErrors] = useState(true);
    const [errors, setErrors] = useState({});

    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        return window.localStorage.clear('bearer');
    }, []);

    const handleFormSubmit = (e) => {
        e.preventDefault();
        console.log(values);
        axios.post('http://localhost:8080/user/auth/login', {
            "email": values.email,
            "password": values.password
        })
        .then((loginResp) => {
            console.log(loginResp.data.token)
            
            window.localStorage.setItem('bearer', loginResp.data.token);
            dispatch(fetchUser());
            return navigate('/home');
        })
        .catch((err) => {
            
            console.log(err.response.data);
            // Show banner for any errors
        })

    };

    const validateForm = (field, value) => {
        if(field === 'email' && !emailRegExp.test(value.toLowerCase())){
            setHasErrors(true);
            return "Invalid email address"
        }
        if(field === 'password' && value.length <= 8){
            setHasErrors(true);
            return "Password must be greater than 8 characters"
        } else {
            setHasErrors(false);
        }
    }

    const handleInputChange = (e) => {
        const {name, value} = e.target;
        setValues({
            ...values,
            [name]: value
        });
        setErrors({
            ...errors,
            [name]: validateForm(name, value),
        });
    }

    return (
        <div>
            <div className="row m-0">
                <div className="col-md-5 m-auto">
                    <form method="POST" onSubmit={handleFormSubmit}>
                        <Card>
                            <div className="form-group">
                                <Formlabel
                                    label="Email:"
                                    htmlFor="email"
                                />
                                <Input
                                    placeholder="Please enter email address"
                                    name="email"
                                    type="email"
                                    value={values.email}
                                    handleChange={handleInputChange}
                                />
                                <FormHelperText>{errors.email}</FormHelperText>
                            </div>
                            <div className="form-group">
                                <Formlabel
                                    label="Password:"
                                    htmlFor="password"
                                />
                                <Input
                                    placeholder="Please enter password"
                                    type="password"
                                    name="password"
                                    value={values.password}
                                    handleChange={handleInputChange}
                                />
                                <FormHelperText>{errors.password}</FormHelperText>
                            </div>
                            <div className="form-group">
                                <Button color="success" disabled={hasErrors}>Login</Button>
                            </div>
                            <div className="form-group">
                                <p>
                                    Don't have an account?{" "}
                                    <Link to="/auth/signup">Sign Up</Link>
                                </p>
                            </div>
                        </Card>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Login;
