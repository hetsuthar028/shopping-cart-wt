import React, { useState } from 'react';
import Input from '../shared/Input';
import Button from '../shared/Button';

const SearchBar = (props) => {

    const [searchBar, setSearchBar] = useState('');

    return (
        <div style={{display: 'inline-flex'}}>
            <h5 style={{alignSelf: 'center', margin: "0 10px"}}>Search: </h5>
            <Input 
                placeholder="Search items"
                name='searchbar'
                value={searchBar}
                handleChange={(e) => setSearchBar(e.target.value)}
            />
            <Button>Search</Button>
        </div>
    );
}

export default SearchBar;
