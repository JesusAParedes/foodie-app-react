import { connect } from 'react-redux';
import Dashboard from '../components/Dashboard';
import { fetchRestaurants, addFood } from '../redux/actions';

const mapStatetoProps = (state) => {
    return {
        user: state.user,
        foodItems: state.foodItems,
        restaurants: state.restaurants
    }
};

const mapDispatchtoProps = (dispatch) => {
    return {
        fetchRestaurants: () => dispatch(fetchRestaurants()),
        addFood: (food) => dispatch(addFood(food))
    }
}

export default connect(mapStatetoProps, mapDispatchtoProps)(Dashboard);