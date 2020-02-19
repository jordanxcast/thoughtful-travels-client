import React, { Component } from 'react'
import { Route } from 'react-router-dom'
import config from '../config'
import LandingPage from '../LandingPage/LandingPage'
import SignUp from '../SignUp/SignUp'
import Login from '../Login/Login'
import NavBar from '../NavBar/NavBar'
import DestListPage from '../DestListPage/DestListPage'
import DestMainPage from '../DestMainPage/DestMainPage'
import AddDest from '../AddDest/AddDest'
import AddEntry from '../AddEntry/AddEntry'
import AddItem from '../AddItem/AddItem'
import EditDest from '../EditDest/EditDest'
import EditEntry from '../EditEntry/EditEntry.js'
import ApiContext from '../ApiContext'
// import './App.css';

class App extends Component {
  constructor(props){
    super(props)
  
  this.state = {
    destinations: [],
    items: [],
    entries: [],
    authToken: null,
  }  
}

  authTokenState = authToken => {
    this.setState({ authToken })
  }

  handleGetDestinations = () => {
    fetch(`${config.API_ENDPOINT}/destinations`, {
      method: 'GET',
      headers: {
        'content-type': 'application/json',
        'Authorization': `Bearer ${this.state.authToken}`
      }
    })
    .then(destinationsRes => {
      if(!destinationsRes.ok){
        return destinationsRes.json()
        .then(err => Promise.reject(err));
      }
      return destinationsRes.json()
    })
    .then(destinations => {
      this.setState({destinations})
    })
    .catch(err => {
      console.error({err});
    });
  }


  //handler methods 
  handleAddDest(newDest) {
    console.log(this, '!!!!!!!!')
    console.log('Destinations in state:', this.state.destinations)
    return this.setState({
      destinations: 
      [
        ...this.state.destinations,
      newDest
      ]
    })
  }

  handleDeleteDest = destId => {
    this.setState({
      destinations: this.state.destinations.filter(d => d.dest_id !== destId)
    })
  }

  handleAddItem = (newItem) => {
    this.setState({
      items: 
      [
        ...this.state.items, 
        newItem
      ]
    })
  }

  handleDeleteItem = (itemId) => {
    console.log('items in state at delete:', this.state.items)
    this.setState({
      items: this.state.items.filter(item => item.item_id !== itemId)
    })
  }

  handleAddEntry = (newEntry) => {
    this.setState({
      entries: [...this.state.entries, newEntry]
    })
  }

  handleDeleteEntry = entryId => {
    this.setState({
      entries: this.state.entries.filter( entry => entry.id !== entryId)
    })
  }

  handleGetItems = destId => {
    fetch(`${config.API_ENDPOINT}/items/${destId}`, {
      method: 'GET',
      headers: {
        'content-type': 'application/json'
      }
    })
    .then(itemsRes => {
      if(!itemsRes.ok){
        return itemsRes.json()
        .then(err => Promise.reject(err))
      }
      return itemsRes.json()
    })
    .then(items => {
      this.setState({items})
    })
    .catch(err =>  {
      console.error({err})
    })
  }

  handleGetEntries = destId => {
    //get request to fetch journal entries for the destination
    fetch(`${config.API_ENDPOINT}/entries/${destId}`, {
      method: 'GET',
      headers: {
        'content-type': 'application/json'
      }
    })
    .then(entriesRes => {
      if(!entriesRes.ok){
        return entriesRes.json()
        .then(err => Promise.reject(err))
      }
      return entriesRes.json()
    })
    .then(entries => {
      this.setState({entries})
    })
    .catch(err =>  {
      console.error({err})
    })
  }

  renderMainRoutes() {
    return (
      <>
        <Route
          exact
          path='/'
          component={LandingPage}
        />
        <Route
          exact
          path='/sign-up'
          component={SignUp}
        />
        <Route
          exact
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
        <Route 
          path='/:destId/edit-destination'
          component={EditDest}
        />
        <Route 
          path='/:destId/edit-entry'
          component={EditEntry}
        />
      </>
    )
  }

  render() {
    const value = {
      destinations: this.state.destinations,
      items: this.state.items,
      entries: this.state.entries,
      authToken: this.state.authToken,
      handleAuthToken: this.authTokenState,
      getDestinations: this.handleGetDestinations,
      getItems: this.handleGetItems,
      getEntries: this.handleGetEntries,
      deleteDest: this.handleDeleteDest,
      deleteItem: this.handleDeleteItem,
      deleteEntry: this.handleDeleteEntry,
      addDest: this.handleAddDest.bind(this),
      addItem: this.handleAddItem,
      addEntry: this.handleAddEntry
    }
    return (
      <ApiContext.Provider value={value}>
        <div className="App">
        <nav className='Navbar'>
          <NavBar/>
        </nav>
        <main className='App_main'>
          {this.renderMainRoutes()}
        </main>
        </div>
      </ApiContext.Provider>
    );
  }
}

export default App;
