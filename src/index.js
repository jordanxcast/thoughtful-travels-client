import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App/App';
import { BrowserRouter } from 'react-router-dom';
import { ApiContextProvider } from '../src/ApiContext'

ReactDOM.render(
  <BrowserRouter>
    <ApiContextProvider>
      <App />
    </ApiContextProvider>
  </BrowserRouter>, 
document.getElementById('root'));
