import React from 'react';
import './Card.css';

const Card = (props) => {
    return (
        <div className='card p-3'>
            {props.children}
        </div>
    );
}

export default Card;
