import React from 'react';

import '../Popup.css'

import {
    Dialog,
    DialogContent,
    DialogTitle
} from '@mui/material';

const PopUp = (props) => {
    const { showRestaurants, restaurants, open, close } = props;

    const handleClose = (e, idx) => {
        close(idx);
    }
    
    return (
        <Dialog open={open} onClose={handleClose} >
            <DialogTitle>Food Options</DialogTitle>
        {restaurants.map((location, idx) => (
            <div className='PopupDiv'>
                <p key={idx}
                className='individualTitle'>
                {location.title}</p>
                <p
                className='individualTitle'>{location.restaurantChain}</p>
        <button
        type='submit'
        onClick={(e) => {close(e, idx)}}
        className='PopupButton'>Add to Favorites</button>
        </div>
    ))}
    </Dialog>
    )
};

export default PopUp;