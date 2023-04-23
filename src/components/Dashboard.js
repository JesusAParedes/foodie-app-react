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

const Dashboard = (props) => {
    const [food, setFood] = useState({
        food_name: "",
        restaurant: ""});
    const [restaurants, setRestaurants] = useState({});
    const [query, setQuery] = useState('');

    console.log(props.user)
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
        })
    }

    const fetchRestaurants = async () => {
        const url = 'https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/food/menuItems/search';
        
       axios.get(url, {
        params: {
            query: 'tacos',
            offset: '1',
            number: '20',
        },
        headers: {
            'X-RapidAPI-Key': 'c42a0f305emsh3e195a8ca5e4f70p1a4c75jsn478fb0bab10e',
'X-RapidAPI-Host': 'spoonacular-recipe-food-nutrition-v1.p.rapidapi.com'
        }
       })
       .then(res => console.log(res.data.menuItems))
        
    }

    const handleAddRestaurants = (e) => {
        e.preventDefault()
        
        setRestaurants(fetchRestaurants)

    }
    
    console.log(restaurants)
    return (
        <Container>
            <h3>Come in, {props.user.first_name}</h3>
                <Box 
                sx={{border: "1px solid #6B37C4", width: "fit-content",}}>
                    <form>
                            Search Food Items
                            <TextField
                            name="food_name"
                            size="small"
                            label="Food Name"
                            type="text"
                            value={query}
                            />
                            <TextField
                            name="restaurant"
                            size="small"
                            label="Restaurant"
                            type="text"
                            />
                            <button
                            onClick={handleAddRestaurants}>Button</button>
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
                                        <DeleteOutlineOutlinedIcon/> 
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
        </Container>
        
    )
}

export default Dashboard;