import React from 'react';
import { BrowserRouter } from 'react-router-dom';

import Navigation from './components/Navigation';
import { Provider } from 'react-redux';
import Router from './Router';
import { store } from './redux/store';

import './stylings/App.css'

function App() {
  return (
    <Provider store={store}>
    <BrowserRouter>
    <Navigation />
    <Router/>
    {/* <Footer /> */}
    </BrowserRouter>
    </Provider>
  );
}

export default App;
