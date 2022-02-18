import React, { useState } from "react";
import Card from "../shared/Card";
import Formlabel from "../shared/FormLabel";
import Input from "../shared/Input";
import Button from "../shared/Button";

const Login = (props) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleFormSubmit = (e) => {
        e.preventDefault();
        console.log(username, password);
    };

    return (
        <div>
            <div className="row">
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
                                    value={username}
                                    handleChange={(e) =>
                                        setUsername(e.target.value)
                                    }
                                />
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
                                    value={password}
                                    handleChange={(e) =>
                                        setPassword(e.target.value)
                                    }
                                />
                            </div>
                            <div className="form-group">
                                <Button color="success">Login</Button>
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
