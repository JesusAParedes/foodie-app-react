import { React, useState, useEffect } from "react";
import '../Dashboard.css'
import axios from "axios";

import {
    Box,
    Container,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    TextField
} from '@mui/material';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import StarRating from "./StarRating";

import PopUp from "./Popup";

const Dashboard = (props) => {
    const [food, setFood] = useState({
        food_name: "",
        restaurant: ""});
    const [restaurants, setRestaurants] = useState({});
    const [query, setQuery] = useState('');
    const [showRestaurants, setShowRestaurants] = useState(false);

    const handleTextChange = (e) => {
        const { name, value } = e.target;
        setFood({...food, [name]: value})
    }

    const handleAddFood = (e) => {
        e.preventDefault();
        props.addFood(food);
        setFood({
            food_name: "",
            restaurant: ""
        });
    };

    const handleQuery = (e) => {
        setQuery(e.target.value);
    };

    const handlePresets = (e, idx) => {
        e.preventDefault();
        props.addFood(restaurants.find((location,index) => {
            if(idx === index) {
                const newList = location;
                Object.assign(newList, {food_name: location.title}, {restaurant: location.restaurantChain})
                return newList;
            }}))};

    const fetchRestaurants = async () => {
        const url = 'https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/food/menuItems/search';
        axios.get(url, {
            params: {
                query: query,
                offset: '1',
                number: 15,
            },
             headers: {
                'X-RapidAPI-Key': 'c42a0f305emsh3e195a8ca5e4f70p1a4c75jsn478fb0bab10e',
                'X-RapidAPI-Host': 'spoonacular-recipe-food-nutrition-v1.p.rapidapi.com'
            }})
       .then(res => {console.log(res.data.menuItems);
        setRestaurants(res.data.menuItems);
        setShowRestaurants(true)});
    };

    const handleAddRestaurants = (e) => {
        e.preventDefault();
        fetchRestaurants();
    };

    const handleDelete = (e, idx) => {
        e.preventDefault();
        console.log(idx);
        console.log(props.removeFood(idx))
        
    };

    return (
        <Container>
            <h3>Come in, {props.user.first_name}</h3>
                <Box 
                sx={{border: "1px solid #6B37C4", width: "fit-content",}}>
                    <form
                    onSubmit={handleAddRestaurants}>
                            Search By
                            <TextField
                            onChange={handleQuery}
                            name="food_name"
                            size="small"
                            label="Food Name or Restaurant"
                            type="text"
                            value={query}
                            />

                            <button
                            >Search</button>
                        </form>
                        
                        <form
                        onSubmit={handleAddFood}>
                            Add Food Item to Favorites
                            <TextField
                            onChange={handleTextChange}
                            name="food_name"
                            size='small'
                            label='Food Name'
                            value={food.food_name}
                            type="text"
                            />
                            <TextField
                            onChange={handleTextChange}
                            name="restaurant"
                            size='small'
                            label="Restaurant"
                            value={food.restaurant}
                            type="text"
                            />
                            <button
                            type="submit"
                            
                            >Favorite Item</button>
                        </form>
                </Box>
                <PopUp 
                showRestaurants={showRestaurants}
                />
                {showRestaurants && restaurants.map((location, idx) => (
                    <div>
            <p key={idx}>
                {location.title}, {location.restaurantChain}</p>
                <button
                type='submit'
                onClick={(e) => {handlePresets(e, idx)}}>Add to Favorites</button>
                </div>
                
        ))}
                
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>
                                    Food Name
                                </TableCell>
                                <TableCell>
                                    Restaurant
                                </TableCell>
                                <TableCell>
                                    Rate Item
                                </TableCell>
                                <TableCell>Remove Item</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {props.foodItems.map((food,idx) => (
                                <TableRow key={idx}>
                                    <TableCell>
                                        {food.food_name}
                                    </TableCell>
                                    <TableCell>
                                        {food.restaurant}
                                    </TableCell>
                                    <TableCell>
                                        {<StarRating/>}
                                    </TableCell>
                                    <TableCell>
                                        <DeleteOutlineOutlinedIcon onClick={(e) => handleDelete(e, idx)}/>
                                    </TableCell>
                                </TableRow>
                                ))}
                        </TableBody>
                    </Table>
        </Container>
        
    )
}

export default Dashboard;