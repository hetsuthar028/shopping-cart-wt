import React from "react";

const ErrorPage = () => {
    return (
        <div>
            <div className="row m-0 mt-5">
                <div className="col-md-6 m-auto">
                    <img
                        src="http://www.google.com/images/errors/robot.png"
                        alt="Error! Page not found."
                    />
                    <h4>Page not found ⚠️</h4>
                </div>
            </div>
        </div>
    );
};

export default ErrorPage;
