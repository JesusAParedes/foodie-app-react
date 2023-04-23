import React from 'react';
import { Routes, Route, Navigate } from 'react-router';
import cookie from 'cookie';

//import components into here as I build my app and put them in the router function
import Login from './components/Login';
import Home from './containers/Home';
import Dashboard from './containers/Dashboard'

//write an actual Authorize function that uses cookies
const checkAuth = () => {
    const cookies = cookie.parse(document.cookie);
    return cookies['loggedIn'] ? true: false;
};

const ProtectedRoute = (props) => {
    const { component: Component, ...rest } = props;

    return (
        checkAuth() === true ?
        ( <Component { ...rest } /> ) : ( <Navigate to='/' /> )
    );
};

const Router = () => {
    return (
        <Routes>
            <Route path="/" element={<Home/>} />
            <Route path="/login" element={<Login/>} />
            <Route path="/dashboard" element={<ProtectedRoute component={ Dashboard }/>} />
        </Routes>
    );
};

export default Router;