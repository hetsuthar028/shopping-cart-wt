import React, { useState } from "react";
import Button from "../shared/Button";
import Card from "../shared/Card";
import Formlabel from "../shared/FormLabel";
import Input from "../shared/Input";

const SignUp = (props) => {
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [cnfPassword, setCnfPassword] = useState('');

    const handleFormSubmit = (e) => {
        e.preventDefault();
        console.log(email, username, password, cnfPassword);
    }

    return (
        <div>
            <div className="row m-0">
                <div className="col-md-5 m-auto">
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
                                    value={email}
                                    handleChange={(e) => setEmail(e.target.value)}                                
                                />
                            </div>

                            <div className="form-group">
                                <Formlabel
                                    htmlFor="username"
                                    label="Username:"
                                />
                                <Input
                                    placeholder="Please enter username"
                                    type="text"
                                    value={username}
                                    handleChange={(e) => setUsername(e.target.value)}
                                />
                            </div>

                            <div className="form-group">
                                <Formlabel
                                    htmlFor="password"
                                    label="Password:"
                                />
                                <Input
                                    placeholder="Please enter password"
                                    type="password"
                                    value={password}
                                    handleChange={(e) => setPassword(e.target.value)}
                                />
                            </div>

                            <div className="form-group">
                                <Formlabel
                                    htmlFor="cnfPassword"
                                    label="Confirm Password:"
                                />
                                <Input
                                    placeholder="Please enter password"
                                    type="cnfPassword"
                                    value={cnfPassword}
                                    handleChange={(e) => setCnfPassword(e.target.value)}
                                />
                            </div>

                            <div className="form-group">
                                <Button type="submit" color="success">Sign Up</Button>
                            </div>

                            <div className="form-group">
                                <p>
                                    Already have an account?{" "}
                                    <a href="#">Login here</a>
                                </p>
                            </div>
                        </Card>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default SignUp;
