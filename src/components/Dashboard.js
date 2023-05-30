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
    const [ editFoodInfo, setEditFoodInfo ] = useState({
        food_name: "",
        restaurant: ""
    })

    const header = {
        headers: { 'Authorization': `Bearer ${token}`}
    }

    const handleTextChange = (e) => {
        const { name, value } = e.target;
        setFood({...food, [name]: value})
    };

    useEffect(
        () => {

            props.addFoodList(header);
                
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
        
        axios.post("http://localhost:4001/food", {
                
                food_name: foodItem.food_name,
                rating: foodItem.rating
            }, header)
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
        props.removeFood(idx);
        console.log(idx)
        axios.delete(`http://localhost:4001/food/${idx}`, header)
        .then(response => console.log(response))   
    };

console.log(props);

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
                                { <EditIcon onClick={() => {
                                    setChangeInputs(true)
                                    setEditFoodInfo({
                                        food_name: food.food_name,
                                        restaurant: food.restaurant,
                                        food_id: food.food_id,
                                        user_id: food.user_id,
                                        rating: food.rating
                                    })
                                }}
                                />
                                }
                            </TableCell>

                            {changeInputs && <EditPopup
                            idx={idx}
                            header={header}
                            updateFood= {props.updateFood} 
                            open={changeInputs}
                            setChangeInputs={setChangeInputs}
                            changeInputs={changeInputs}
                            food={food}
                            setFood={setFood}
                            APIlist={restaurants}
                            upadteList={setRestaurants}
                            editFoodInfo={editFoodInfo}
                            setEditFoodInfo={setEditFoodInfo}/>}

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