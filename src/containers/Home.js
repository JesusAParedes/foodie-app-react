import { connect } from 'react-redux';
import Home from '../components/Home';
import { addUser, backendFood } from '../redux/actions';

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
        addUser: (user) => dispatch(addUser(user)),
        backendFood: (token) => dispatch(backendFood(token))
    }
}

export default connect(mapStatetoProps, mapDispatchtoProps)(Home);