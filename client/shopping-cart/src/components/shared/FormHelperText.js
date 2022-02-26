import React from "react";

const FormHelperText = (props) => {
    const { color = "danger" } = props;
    return (
        <p
            className={`text-start text-${color}`}
            style={{ fontSize: "12px", margin: "0", fontWeight: "bold" }}
        >
            {props.children}
        </p>
    );
};

export default FormHelperText;
