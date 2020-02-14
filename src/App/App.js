import React, { Component } from 'react'
import { Route } from 'react-router-dom'
import config from '../config'
import NavBar from '../NavBar/NavBar'
import DestListPage from '../DestListPage/DestListPage'
import DestMainPage from '../DestMainPage/DestMainPage'
// import AddDest from '../AddDest/AddDest'
// import AddEntry from '../AddEntry/Add'
// import AddItem from '../AddItem/AddItem'
import ApiContext from '../ApiContext'
// import './App.css';

class App extends Component {
  state = {
    destinations: [],
    items: [],
    entries: [],
  }

  componentDidMount() {
    fetch(`${config.API_ENDPOINT}/destinations`, {
      method: 'GET',
      headers: {
        'content-type': 'application/json',
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
      console.log('Destinations:', destinations)
      this.setState({destinations})
    })
    .catch(err => {
      console.error({err});
    });
  }

  //handler methods 
  handleAddDest = (newDest) => {
    this.setState({
      destinations: 
      [
        ...this.state.destinations,
      newDest
      ]
    })
  }

  handleDeleteDest = destId => {
    this.setState({
      destinations: this.state.destinations.filter(d => d.id !== destId)
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
    fetch(`${config.API_ENDPOINT}/destinations/${destId}`, {
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
      console.log('Items response:', items)
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
      console.log('Items response:', entries)
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
        path={'/destinations'}
        component={DestListPage}
        />
        <Route
          path='/destinations/:destId'
          component={DestMainPage}
        />
        <Route 
          path='/add-destination'
          component={DestListPage}
        />
        <Route 
          path='/destinations/:destId/add-item'
          component={DestListPage}
        />
        <Route 
          path='/destinations/:destId/add-entry'
          component={DestListPage}
        />
      </>
    )
  }

  render() {
    const value = {
      destinations: this.state.destinations,
      items: this.state.items,
      entries: this.state.entries,
      getItems: this.handleGetItems,
      getEntries: this.handleGetEntries,
      deleteDest: this.handleDeleteDest,
      deleteEntry: this.handleDeleteEntry,
      deleteItem: this.handleDeleteItem,
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
