import { React, useState } from 'react';
import { useNavigate } from 'react-router';
import axios from 'axios';

import cookie from 'cookie';

import '../stylings/Home.css';

import Login from './Login';
import SignUp from './SignUp';

const Home = (props) => {
    
const [newUser, setNewUser] = useState({
        first_name: '',
        last_name: '',
        email: '',
        Username: '',
        Password: ''
    });

const [user, setUser] = useState({
    first_name: '',
    last_name: '',
    email: '',
    username: '',
    password: ''
});

const [ homepage, setHomepage ] = useState(false);
const [ token, setToken ] = useState('')

const navigate = useNavigate();

const handlePage = (e) => {
    e.preventDefault();
    setHomepage(true);
}

const handleNewAccount = (e) => {
        const { name, value } = e.target;
        setNewUser({...newUser, [name]: value})
};

const handleUser = (e) => {
    const { name, value } = e.target;
    setUser({...user, [name]: value})
};

const handleCreateUser = (e) => {
    e.preventDefault()
       axios.post("https://foodie-app-backend-capstone.herokuapp.com/users", {
        first_name: newUser.first_name,
        last_name: newUser.last_name,
        email: newUser.email,
        username: newUser.Username,
        password: newUser.Password
       })
       .then(response => {
        document.cookie = cookie.serialize("token", response.data.token, { maxAge: 180 });
        props.backendFood(response.data.token);
        props.addUser(newUser.first_name)
        navigate("/dashboard")
       })

    };

const handleLogin = (e) => {
    e.preventDefault()
    axios.post("https://foodie-app-backend-capstone.herokuapp.com/login", {
        // origin: 'https://foodie-app-react.vercel.app',
        // header: "Access-Control-Allow-Origin",
        username: user.username,
        password: user.password
    })
    .then(response => {
        document.cookie = cookie.serialize("token", response.data.token, { maxAge: 180 });
        props.backendFood(response.data.token);
        setToken(response.data.token);
        navigate("/dashboard")
    })
    
    };


    return (
        <div className='Home'>
                {homepage === false ?
                <div> 
                <Login 
                handleLogin={handleLogin}
                handleUser={handleUser}
                user={user}/> <section className="login">
                <p >New User?
                  <button 
                  type='submit'
                  onClick={handlePage}>Click here to create Account.</button> 
                  </p>
                </section> </div> : 
                <SignUp 
                handleCreateUser={handleCreateUser}
                handleNewAccount={handleNewAccount}
                newUser={newUser}/>}               
        </div>
    );
};

export default Home;