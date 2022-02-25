import React from 'react';
import './Card.css';

const Card = (props) => {
    return (
        <div className='card p-3 my-2' {...props}>
            {props.children}
        </div>
    );
}

export default Card;
