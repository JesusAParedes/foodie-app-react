import React from 'react';
import { useState } from 'react';

import '../stylings/Popup.css'

import {
    Dialog,
    DialogTitle,
    TextField
} from '@mui/material';

import CloseIcon from '@mui/icons-material/Close';

const EditPopup = (props) => {
    const { setChangeInputs, APIlist, food, setFood, updateList } = props;
    const [ open, setOpen ] = useState(false);

    const handleTextChange = (i, e) => {
        const location = food.location;
        console.log(e.target.value)
        location[i] = e.target.value;

        setFood(location);

    }

    const handleClose = (e) => {
        setChangeInputs(false);
        setOpen(false);
    }
    
    const handleOpen = () => {
        setOpen(true);
    }
    console.log(props.food)

    return (
        <Dialog  
        open={handleOpen} 
        onClose={handleClose}>
            <DialogTitle className='FoodTitle'>Changes 
                <CloseIcon onClick={handleClose}/>
            </DialogTitle>
            <div className='PopupDiv'>

        Food Name
        <TextField
        value={props.food.food_name}
        onChange={handleTextChange}
        >
        </TextField>

        Restaurant
        <TextField
        value={props.food.restaurant}
        >
        </TextField>
                
        <button
        type='submit'
        onClick={handleClose}
        className='PopupButton'>Save Changes</button>
        </div>
    
    </Dialog>
    )
};

export default EditPopup;