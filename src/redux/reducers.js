import { combineReducers } from 'redux';

const user = (state = user, action) => {
    switch(action.type) {
        case "ADD_USER":
            return {...action.value, isLoggedIn: true};
        default:
            return state;
    }
};

const foodItems = (state = foodItems, action) => {
    switch(action.type) {
        case "ADD_FOOD":
            return [...state, action.value];
        case "REMOVE_FOOD":
            const food = [...state];
            food.splice(action.value, 1)
            return food;
        default:
            return state;
    }
};

const restaurants = (state = [], action) => {
    switch(action.type) {
        case "FETCH_RESTAURANTS":
            return action.value;
        default:
            return state;
    }
};

const token = (state = token, action) => {
    switch(action.type) {
        case "CHECK_TOKEN":
            return action.value;
        default:
            return state;
    }
}

export default combineReducers({ user, foodItems, restaurants, token });