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
    } = props;
    return (
        <input
            type={type}
            className={type==="radio" || type==="checkbox"  ? `form-${type} my-2`: 'form-control my-2'}
            placeholder={placeholder}
            name={name}
            id={id}
            onChange={handleChange}
            value={value}
            required={required}
            checked={checked}
        />
    );
};

export default Input;
