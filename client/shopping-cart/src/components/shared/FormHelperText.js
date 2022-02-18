import React from 'react';

const FormHelperText = (props) => {
    return (
        <p className="text-start text-danger" style={{fontSize: '12px', margin: '0', fontWeight: 'bold'}}>
            {props.children}
        </p>
    );
}

export default FormHelperText;
