import React, { Component } from 'react'
import { Route, Switch } from 'react-router-dom'
// import config from '../config'
// import PrivateRoute from '../Utils/PrivateRoute'
// import PublicOnlyRoute from '../Utils/PublicOnlyRoute'
import LandingPage from '../components/LandingPage/LandingPage'
import SignUp from '../components/SignUp/SignUp'
import Login from '../components/Login/Login'
import NavBar from '../components/NavBar/NavBar'
import DestListPage from '../components/DestListPage/DestListPage'
import DestMainPage from '../components/DestMainPage/DestMainPage'
import AddDest from '../components/AddDest/AddDest'
import AddEntry from '../components/AddEntry/AddEntry'
import AddItem from '../components/AddItem/AddItem'
// import ApiContext from '../ApiContext'
// import './App.css';

class App extends Component {

  render() {
    return (
        <div className="App">
            <nav className='Navbar'>
              <NavBar/>
            </nav>
          <main className='App_main'>
            <Switch>
              <Route
                exact
                path='/'
                component={LandingPage}
              />
              <Route
                path='/sign-up'
                component={SignUp}
              />
              <Route
                path='/login'
                component={Login}
              /> 
              <Route
              exact
              path='/destinations'
              component={DestListPage}
              />
              <Route
                path='/destinations/:destId'
                component={DestMainPage}
              />
              <Route 
                path='/add-destination'
                component={AddDest}
              />
              <Route 
                path='/:destId/add-item'
                component={AddItem}
              />
              <Route 
                path='/:destId/add-entry'
                component={AddEntry}
              />
            </Switch>
          </main>
        </div>
    );
  }
}

export default App;
