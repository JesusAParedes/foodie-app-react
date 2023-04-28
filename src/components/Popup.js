import React from 'react';

import '../stylings/Popup.css'

import {
    Dialog,
    DialogTitle
} from '@mui/material';

import CloseIcon from '@mui/icons-material/Close';

const PopUp = (props) => {
    const { setShowRestaurants, restaurants, open, close } = props;

    const handleClose = (e) => {
        setShowRestaurants(false)
    }
    
    return (
        <Dialog open={open} onClose={handleClose} >
            <DialogTitle className='FoodTitle'>Food Options 
                <CloseIcon onClick={handleClose}/>
            </DialogTitle>
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