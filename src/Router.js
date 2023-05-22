import React from 'react';
import { Routes, Route, Navigate } from 'react-router';
import cookie from 'cookie';

//import components into here as I build my app and put them in the router function
import SignUp from './components/SignUp';
import Home from './containers/Home';
import Dashboard from './containers/Dashboard'

//write an actual Authorize function that uses cookies
const checkAuth = () => {
    const cookies = cookie.parse(document.cookie);
    return cookies['token'] ? true: false;
};

const ProtectedRoute = (props) => {
    const { component: Component, ...rest } = props;

    return (
        checkAuth() === true ?
        ( <Component { ...rest } /> ) : ( <Navigate to='/foodie-app-react' /> )
    );
};

const Router = () => {
    return (
        <Routes>
            <Route path="/foodie-app-react" element={<Home/>} />
            <Route path="/foodie-app-react/signup" element={<SignUp/>} />
            <Route path="/foodie-app-react/dashboard" element={<ProtectedRoute component={ Dashboard }/>} />
        </Routes>
    );
};

export default Router;