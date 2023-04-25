import React from 'react';

import {
    Box,
    TextField
} from '@mui/material';

import '../stylings/SearchForms.css';

const SearchForms = (props) => {
    const { food, handleAddRestaurants, handleQuery, query, handleAddFood, handleTextChange } = props;

    return (
        <Box className='box'>
                    <form 
                    onSubmit={handleAddRestaurants}
                    className='searchForm'
                    >
                            Search By
                            <TextField
                            onChange={handleQuery}
                            name="food_name"
                            size="small"
                            label="Food Name or Restaurant"
                            type="text"
                            value={query}
                            className='textBox'
                            />

                            <button
                            className='searchButton'>Search</button>
                        </form>
                        
                        <form 
                        onSubmit={handleAddFood}
                        className='searchForm'>
                            Add Food Item to Favorites
                            <TextField
                            onChange={handleTextChange}
                            name="food_name"
                            size='small'
                            label='Food Name'
                            value={food.food_name}
                            type="text"
                            className='textBox'
                            />
                            <TextField
                            onChange={handleTextChange}
                            name="restaurant"
                            size='small'
                            label="Restaurant"
                            value={food.restaurant}
                            type="text"
                            className='textBox'
                            />
                            <button
                            type="submit"
                            className='searchButton'>Favorite Item</button>
                        </form>
                </Box>
    );
};

export default SearchForms;