import { React, useEffect, useState } from "react";
import '../stylings/Dashboard.css'
import axios from "axios";
import cookie from 'cookie';

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
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';

import EditPopup from "./EditPopup";
import PopUp from "./Popup";
import SearchForms from "./SearchForms";
import { backendFood } from "../redux/actions";

const Dashboard = (props) => {
    const { token } = props;
    const [food, setFood] = useState({
        food_name: "",
        restaurant: "",
        rating: 0});
    const [restaurants, setRestaurants] = useState({});
    const [query, setQuery] = useState('');
    const [showRestaurants, setShowRestaurants] = useState(false);
    const [ changeInputs, setChangeInputs ] = useState(false);

    const handleTextChange = (e) => {
        const { name, value } = e.target;
        setFood({...food, [name]: value})
    };

    useEffect(
        () => {
            axios.get("http://localhost:4001/food")
        },[]
    )

    //add Food from one the client adds themselves to list
    const handleAddFood = (e) => {
        e.preventDefault();
        props.addFood(food);
        backendAddFood(food);
        setFood({
            food_name: "",
            restaurant: "",
            rating: 0
        })};

    //handle text value for textInput for API
    const handleQuery = (e) => {
        console.log(e.target.value)
        setQuery(e.target.value);
    };

    //add food from API to list from the popup
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

    

        //send the info to add the food to the database
    const backendAddFood = (foodItem) => {
        console.log(foodItem)
        const header = {
            headers: { 'Authorization': `Bearer ${token}`}
        }
        axios.post("http://localhost:4001/food", {
                header,
                food_name: foodItem.food_name,
                rating: foodItem.rating
            })
            .then(response => {
                document.cookie = cookie.serialize("token", response.data.token, { maxAge: 60 });
                
                console.log(response.data.newToken)
                props.backendFood(response.data.newToken);
                console.log(response)})
    }

    //fetches the search query from the API and shows the popup on the page
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

    //runs the functions for showing the Popup on the page
    const handleAddRestaurants = (e) => {
        e.preventDefault();
        fetchRestaurants();
    };

    //removes an item from the list
    const handleDelete = (e, idx) => {
        e.preventDefault();
        props.removeFood(idx)
    };

    
// console.log(props)
// console.log(token)
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
                            Update Info
                        </TableCell>
                        <TableCell>
                            Food Name
                        </TableCell>
                        <TableCell>
                            Restaurant
                        </TableCell>
                        <TableCell>
                            Rate Item
                        </TableCell>
                        <TableCell>
                            Remove Item
                        </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {props.foodItems.map((food,idx) => (
                        <TableRow key={idx}>
                            <TableCell>
                                { <EditIcon onClick={() => setChangeInputs(true)} />
                                }
                            </TableCell>

                            {changeInputs && <EditPopup 
                            open={changeInputs}
                            setChangeInputs={setChangeInputs}
                            food={food}
                            setFood={setFood}
                            APIlist={restaurants}
                            upadteList={setRestaurants}/>}

                            <TableCell 
                            name= 'food_name'>
                                {food.food_name}
                            </TableCell>
                            <TableCell 
                            name= 'restaurant'>
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
    )}

export default Dashboard;