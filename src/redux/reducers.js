import { combineReducers } from 'redux';

const user = (state = user, action) => {
    switch (action.type) {
        case "ADD_USER":
            return { ...action.value, isLoggedIn: true };
        default:
            return state;
    }
};

const foodItems = (state = foodItems, action) => {
    switch (action.type) {
        case "ADD_FOOD":
            return [...state, action.value];
        case "REMOVE_FOOD":
            const food = [...state];
            food.splice(action.value, 1)
            return food;
        case "UPDATE_FOOD":
            const foodUpdate = [...state];
            const updateItemIndex = foodUpdate.findIndex(item => {
                return item.food_id == action.value.food_id
            })
            foodUpdate[updateItemIndex] = action.value
            return foodUpdate;
        case "ADD_FOOD_LIST":
            return action.value;
        default:
            return state;
    }
};

const restaurants = (state = [], action) => {
    switch (action.type) {
        case "FETCH_RESTAURANTS":
            return action.value;
        default:
            return state;
    }
};

const token = (state = token, action) => {
    switch (action.type) {
        case "CHECK_TOKEN":
            console.log(action)
            return action.value;
        default:
            return state;
    }
}

export default combineReducers({ user, foodItems, restaurants, token });