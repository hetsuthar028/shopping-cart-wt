import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import './banner.css';
import { hideBanner } from '../../redux';

const Banner = (props) => {

    const dispatch = useDispatch();

    useEffect(() => {
        setTimeout(() => {
            dispatch(hideBanner());
        }, 3000);
    }, []);

    return (
        <div>
            <div className={`banner-container ${props.error ? 'error-banner-container' : 'success-banner-container'}`}>
                <pre>{props.message}</pre>
            </div>
        </div>
    );
}

export default Banner;
