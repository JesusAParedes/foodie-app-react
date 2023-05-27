import React from 'react';
import { useState } from 'react';

import '../stylings/Popup.css'

import {
    Dialog,
    DialogTitle
} from '@mui/material';

import CloseIcon from '@mui/icons-material/Close';

const EditPopup = (props) => {
    const { setChangeInputs } = props;

    const [ open, setOpen ] = useState(false);

    const handleClose = (e) => {
        setOpen(false)
    }
    
    const handleOpen = () => {
        setOpen(true);
    }

    return (
        <Dialog  open={() => handleOpen} onClose={(e) => handleClose(e)} >
            <DialogTitle className='FoodTitle'>Changes 
                <CloseIcon onClick={handleClose}/>
            </DialogTitle>
            <div className='PopupDiv'>
                
        <button
        type='submit'
        onClick={(e) => handleClose(e)}
        className='PopupButton'>Save Changes</button>
        </div>
    
    </Dialog>
    )
};

export default EditPopup;