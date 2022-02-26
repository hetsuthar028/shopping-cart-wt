import React from "react";

const Input = (props) => {
    const {
        type = "text",
        handleChange = () => {},
        name,
        id = props.name,
        placeholder,
        value,
        required = true,
        checked = false,
        className,
        disabled = false,
    } = props;
    return (
        <input
            type={type}
            className={
                type === "radio" || type === "checkbox"
                    ? `form-${type} my-2 ` + className
                    : "form-control my-2 " + className
            }
            placeholder={placeholder}
            name={name}
            id={id}
            onChange={handleChange}
            value={value}
            required={required}
            checked={checked}
            disabled={disabled}
        />
    );
};

export default Input;
