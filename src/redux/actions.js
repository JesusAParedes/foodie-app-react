export const addUser = (user) => {
    return {
        type: "ADD_USER",
        value: user
    }
}

export const addFood = (foodItems) => {
    return {
        type: "ADD_FOOD",
        value: foodItems
    };
};

export const removeFood = (index) => {
    return {
        type: "REMOVE_FOOD",
        value: index
    };
};

export const updateFood = (foodItem) => {
    return {
        type: "UPDATE_FOOD",
        value: foodItem
    }
}

export const addFoodList =(header, id) => {
    return (dispatch) => {
        console.log(id, food.food_id)
        fetch('https://foodie-app-six.vercel.app/:id', header)
        .then(res => res.json())
        .then(response => {
            const action = {
                type: "ADD_FOOD_LIST",
                value: response
            }
            dispatch(action);
        })
    }
}

export const fetchRestaurants = () => {
    const url = 'https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/food/menuItems/';

    return (dispatch) => {
        fetch(url, {
            method: 'GET',
            params: {
                // query: 'dairy queen',
                offset: '1',
                number: '20',
            },
            headers: {
                'X-RapidAPI-Key': process.env.Key,
    'X-RapidAPI-Host': process.env.website
            }
        })
        .then(res => res.json())
        .then(response => {
            const action = {
                type: "FETCH_FoodItems",
                value: response.data
            };
        dispatch(action)
        });
    };
};

export const backendFood = (token) => {
    return {
        type: "CHECK_TOKEN",
        value: token
    };
}