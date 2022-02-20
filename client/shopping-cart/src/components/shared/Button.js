import React from "react";

const Button = (props) => {
    const { type, handleClick = () => {}, color = "primary", disabled = false } = props;
    return (
        <button
            type={type}
            className={`btn btn-${color} my-1`}
            onClick={handleClick}
            disabled={disabled}
        >
            {props.children}
        </button>
    );
};

export default Button;
