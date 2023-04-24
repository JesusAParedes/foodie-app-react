import React from 'react';

const PopUp = (props) => {
    
    return (
        props.showRestaurants && props.restaurants.map((location, idx) => (
            <div>
    <p key={idx}>
        
        {location.title}, {location.restaurantChain}</p>
        <button
        type='submit'
        onClick={(e) => {props.handlePresets(e, idx)}}>Add to Favorites</button>
        </div>
    ))
    )
};

export default PopUp;