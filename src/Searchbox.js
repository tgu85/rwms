import React from 'react';

const Searchbox = ({ searchfield, searchChange }) => {
    return (
        <div className='pa2'>
            <input className='pa3 ba avenir bg-washed-red'
                type='search'
                pleacheholder='Name'
                onChange={searchChange} />
        </div>
    );
}

export default Searchbox;
