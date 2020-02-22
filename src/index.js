import React from 'react';
import ReactDOM from 'react-dom';
import { library } from '@fortawesome/fontawesome-svg-core'
// import { fab } from '@fortawesome/free-brands-svg-icons'
import { faArrowLeft, faTrash, faTimes, faPlusCircle, faCompass, faDollarSign } from '@fortawesome/free-solid-svg-icons'
import App from './App/App';
import { BrowserRouter } from 'react-router-dom';
import { ApiContextProvider } from './ApiContext'
import './index.css';

library.add( faArrowLeft, faTrash, faTimes, faPlusCircle, faCompass, faDollarSign)

ReactDOM.render(
  <BrowserRouter>
    <ApiContextProvider>
      <App />
    </ApiContextProvider>
  </BrowserRouter>, 
document.getElementById('root'));
