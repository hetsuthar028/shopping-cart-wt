import React from "react";

const Button = (props) => {
    const { type, handleClick = () => {}, color = "primary", disabled = false } = props;
    return (
        <button
            type={type}
            className={`btn btn-${color} m-2`}
            onClick={handleClick}
            disabled={disabled}
        >
            {props.children}
        </button>
    );
};

export default Button;
