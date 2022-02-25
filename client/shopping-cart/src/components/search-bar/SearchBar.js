import React, { useState } from 'react';
import Input from '../shared/Input';
import Button from '../shared/Button';

const SearchBar = (props) => {

    const { searchFilter, setSearchFilter, performSearch } = props;
    return (
        <div className='col-md-7 m-auto my-2'>
        <div style={{display: "inline-flex"}} className="form-group">
            <h5 style={{alignSelf: 'center', margin: "0 10px"}}>Search: </h5>
            <Input 
                placeholder="Search items"
                name='searchbar'
                handleChange={performSearch}
            />
            <Button>Search</Button>
        </div>
        </div>
    );
}

export default SearchBar;
