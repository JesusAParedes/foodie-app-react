import { React, useState } from 'react';
import { TextField, Button, Container } from "@mui/material";
import { useNavigate } from 'react-router';
import cookie from 'cookie';
import '../Home.css'

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
})

const navigate = useNavigate();

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
    props.addUser(newUser || user);
    document.cookie = cookie.serialize("loggedIn", "true", { maxAge: 60 });
       navigate("/foodie-app-react/dashboard")
    };

const handleLogin = () => {
        document.cookie = cookie.serialize("loggedIn", "true", { maxAge: 60 });
        navigate("/dashboard")
    };

    return (
        <div className='Home'>
                <Container style={{display: "flex", alignItems: "flex-start"}}>
                    <form 
                    className="form"
                    name= "login"
                    onSubmit={handleLogin}>
                        <TextField
                        onChange={handleUser}
                        value={user.username}
                        name="username"
                        label="Username"
                        type="text"
                        />
                        <TextField
                        onChange={handleUser}
                        value={user.password}
                        name="password"
                        label="Password"
                        type="password"
                        />
                            <Button
                            type="submit"
                            className="button"
                            variant="contained"
                            >Login
                            </Button>
                        </form>

                        <form 
                        className='form'
                        name="createAccount"
                        onSubmit={handleCreateUser}>
                        <TextField
                        onChange={handleNewAccount}
                        value={newUser.first_name}
                        name="first_name"
                        label="First Name"
                        type="text" 
                        />
                        <TextField
                        onChange={handleNewAccount}
                        value={newUser.last_name}
                        name="last_name"
                        label="Last Name"
                        type="text" 
                        />
                        <TextField
                        onChange={handleNewAccount}
                        name="email"
                        value={newUser.email}
                        label="E-mail"
                        type="text" 
                        />
                        <TextField
                        onChange={handleNewAccount}
                        name="NewUsername"
                        value={newUser.username}
                        label="Username"
                        type="text" 
                        />
                        <TextField
                        onChange={handleNewAccount}
                        name="NewPassword"
                        value={newUser.password}
                        label="Password"
                        type="password" 
                        />
                            <Button
                            type="submit"
                            className="button"
                            variant="contained"
                            >Create Account
                            </Button>
                        </form>
                </Container>
        </div>
    )
}

export default Home;