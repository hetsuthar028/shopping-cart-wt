import React, { useState } from "react";
import Card from "../shared/Card";
import Formlabel from "../shared/FormLabel";
import Input from "../shared/Input";
import Button from "../shared/Button";
import FormHelperText from "../shared/FormHelperText";

const initialValues = {
    username: "",
    password: "",
}

const Login = (props) => {
    const [values, setValues] = useState(initialValues);
    const [hasErrors, setHasErrors] = useState(true);
    const [errors, setErrors] = useState({});

    const handleFormSubmit = (e) => {
        e.preventDefault();
        console.log(values);
    };

    const validateForm = (field, value) => {
        if(field === 'username' && value.length <= 5){
            setHasErrors(true);
            return "Username must contains more than 5 characters"
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
                                    label="Username:"
                                    htmlFor="username"
                                />
                                <Input
                                    placeholder="Please enter username"
                                    name="username"
                                    value={values.username}
                                    handleChange={handleInputChange}
                                />
                                <FormHelperText>{errors.username}</FormHelperText>
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
                                    <a href="">Sign Up</a>
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
