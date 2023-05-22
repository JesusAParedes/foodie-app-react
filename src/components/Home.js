import { React, useState, useEffect } from 'react';
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
    username: '',
    password: ''
});

const [ homepage, setHomepage ] = useState(false);

const navigate = useNavigate();

 useEffect(
    () => {
        fetch("http://localhost:4001/users")
        .then(res => res.json())
        .then(data => console.log(data))
    }, []
 )

const handlePage = (e) => {
    e.preventDefault();
    setHomepage(true);
}

const handleNewAccount = (e) => {
        const { name, value } = e.target;
        // const newList = location;
        // Object.assign(newList, {food_name: location.title}, {restaurant: location.restaurantChain})
        // return newList;
        console.log(name)
        setNewUser({...newUser, [name]: value})
};

const handleUser = (e) => {
    const { name, value } = e.target;
    setUser({...user, [name]: value})
};

const handleCreateUser = (e) => {
    e.preventDefault()
    props.addUser(newUser || user);
    // document.cookie = cookie.serialize("loggedIn", "true", { maxAge: 60 });
    //    navigate("/foodie-app-react/dashboard")

       axios.post("http://localhost:4001/users", {
        first_name: newUser.first_name,
        last_name: newUser.last_name,
        email: newUser.email,
        username: newUser.Username,
        password: newUser.Password
       })
       .then(response => {
        document.cookie = cookie.serialize("token", response.data.token, { maxAge: 60 });
       })

    };

const handleLogin = (e) => {
    e.preventDefault()
    axios.post("http://localhost:4001/login", {
        username: user.username,
        password: user.password
    })
    .then(response => {
        document.cookie = cookie.serialize("token", response.data.token, { maxAge: 60 });
        navigate("/foodie-app-react/dashboard")
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