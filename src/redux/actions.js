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

export const backendFood = () => {
    return {
        type: "CHECK_TOKEN",
        value: token
    };
}