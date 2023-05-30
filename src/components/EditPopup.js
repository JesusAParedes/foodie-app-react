import React from 'react';
import { useState } from 'react';
import axios from 'axios';

import '../stylings/Popup.css'

import {
    Dialog,
    DialogTitle,
    TextField
} from '@mui/material';

import CloseIcon from '@mui/icons-material/Close';

const EditPopup = (props) => {
    const { setChangeInputs, APIlist, food, setFood, updateList, editFoodInfo, setEditFoodInfo, changeInputs, header } = props;
    const [open, setOpen] = useState(false);

    const handleTextChange = (e) => {
        console.log( e.target.value, 'event.target')
        console.log(editFoodInfo, 'edit')
        const {name, value} = e.target;
        setEditFoodInfo({
            ...editFoodInfo,
            [name]: value 
        })
    }


    const submitChanges = (idx) => {
        console.log(editFoodInfo, 'BEFORE UPDATE')
        axios.put(`http://localhost:4001/food/${idx}`,
        editFoodInfo,
        header)
        .then(response => console.log(response))
        
        props.updateFood(editFoodInfo)
        handleClose()
    }

    const handleClose = (e) => {
        setChangeInputs(false);
        setOpen(false);
    }

    return (
        <Dialog
            open={changeInputs}
            >
            <DialogTitle className='FoodTitle'>Changes
                <CloseIcon onClick={handleClose} />
            </DialogTitle>
            <div className='PopupDiv'>

                Food Name
                <TextField
                    value={editFoodInfo.food_name}
                    onChange={handleTextChange}
                    name='food_name'
                >
                </TextField>

                Restaurant
                <TextField
                    value={editFoodInfo.restaurant}
                    onChange={handleTextChange}
                    name='restaurant'
                >
                </TextField>

                <button
                    onClick={() => submitChanges(props.idx)}
                    type='submit'
                    className='PopupButton'>Save Changes</button>
            </div>

        </Dialog>
    )
};

export default EditPopup;