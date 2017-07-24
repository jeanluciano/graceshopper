import '../assets/stylesheets/index.scss'
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from "react-redux";
import { BrowserRouter as Router } from 'react-router-dom';
import { Main } from './components';
import store from "./store/index";

ReactDOM.render(
  <Provider store={store}>   
    <Router>
    </Router>
  </Provider>,
  document.getElementById('main') // make sure this is the same as the id of the div in your index.html
);