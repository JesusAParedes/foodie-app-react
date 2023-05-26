import { React, useEffect, useState } from "react";
import '../stylings/Dashboard.css'
import axios from "axios";

import {
    Container,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
} from '@mui/material';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import StarRating from "./StarRating";

import PopUp from "./Popup";
import SearchForms from "./SearchForms";

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
    };

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
                backendAddFood(newList);
                console.log(newList)
                return newList;
            }}))
           
        setShowRestaurants(false)
        };

    
    const backendAddFood = (foodItem) => {
        console.log(foodItem)
        axios.post("http://localhost:4001/food", {
                food_name: foodItem.title,
                rating: foodItem.rating
            })
            .then(response => console.log(response))
    }


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
       .then(res => {
        console.log(res.data.menuItems)
        setRestaurants(res.data.menuItems);
        setShowRestaurants(true)});
    };

    const handleAddRestaurants = (e) => {
        e.preventDefault();
        fetchRestaurants();
    };

    const handleDelete = (e, idx) => {
        e.preventDefault();
        props.removeFood(idx)
    };
console.log(props.user)
    return (
        <Container>
            <h3>Come in, {props.user.first_name}</h3>

            <SearchForms 
            food={food}
            handleAddRestaurants={handleAddRestaurants}
            handleQuery={handleQuery}
            query={query}
            handleAddFood={handleAddFood}
            handleTextChange={handleTextChange}
            />
                
            {showRestaurants && <PopUp 
            showRestaurants={showRestaurants}
            setShowRestaurants={setShowRestaurants}
            open={fetchRestaurants}
            restaurants={restaurants}
            close={handlePresets}/>}
                        
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