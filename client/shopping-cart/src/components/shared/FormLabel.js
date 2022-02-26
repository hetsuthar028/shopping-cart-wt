import React from "react";

const Formlabel = (props) => {
    return (
        <label className="my-1" htmlFor={props.htmlFor}>
            {props.label}
        </label>
    );
};

export default Formlabel;
