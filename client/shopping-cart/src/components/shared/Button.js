import React from "react";

const Button = (props) => {
    const { type, handleClick = () => {}, color = "primary", disabled = false, style } = props;
    return (
        <button
            type={type}
            className={`btn btn-${color} m-1`}
            onClick={handleClick}
            disabled={disabled}
            style={style}
        >
            {props.children}
        </button>
    );
};

export default Button;
