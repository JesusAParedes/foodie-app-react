import { connect } from 'react-redux';
import Home from '../components/Home';
import { addUser } from '../redux/actions';

const mapStatetoProps = (state) => {
    return {
        user: state.user
    }
};

const mapDispatchtoProps = (dispatch) => {
    return {
        addUser: (user) => dispatch(addUser(user))
    }
}

export default connect(mapStatetoProps, mapDispatchtoProps)(Home);