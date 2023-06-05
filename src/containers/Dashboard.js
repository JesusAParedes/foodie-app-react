import { connect } from 'react-redux';
import Dashboard from '../components/Dashboard';
import { fetchRestaurants, addFood, removeFood, backendFood, addFoodList, updateFood } from '../redux/actions';

const mapStatetoProps = (state) => {
    return {
        user: state.user,
        foodItems: state.foodItems,
        restaurants: state.restaurants,
        token: state.token
    }
};

const mapDispatchtoProps = (dispatch) => {
    return {
        fetchRestaurants: () => dispatch(fetchRestaurants()),
        addFood: (food) => dispatch(addFood(food)),
        removeFood: (index) => dispatch(removeFood(index)),
        addFoodList: (header) => dispatch(addFoodList(header,food.food_id)),
        backendFood: (token) => dispatch(backendFood(token)),
        updateFood: (foodItem) => dispatch(updateFood(foodItem))
    }
}

export default connect(mapStatetoProps, mapDispatchtoProps)(Dashboard);