import React, {Component} from 'react'
import config from './config'

// export default React.createContext({
const ApiContext = React.createContext({
    destinations : [],
    items: [],
    entries: [],
    authToken: null,
    handleAuthToken: () => {},
    getDestinations: () => {},
    getItems: () => {},
    getEntries: () => {},
    deleteDest: () => {},
    deleteItemt: () => {},
    deleteEntry: () => {},
    addDest: () => {},
    addItem: () => {},
    addEntry: () => {},
    editDest: () => {},
})

export default ApiContext;

export class ApiContextProvider extends Component {
  state = {
    destinations : [],
    items: [],
    entries: [],
    authToken: null,
  };

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


  handleDeleteDest = destId => {
    this.setState({
      destinations: this.state.destinations.filter(d => d.dest_id !== destId)
    })
  }

  handleDeleteItem = (itemId) => {
    this.setState({
      items: this.state.items.filter(item => item.item_id !== itemId)
    })
  }

  handleDeleteEntry = entryId => {
    this.setState({
      entries: this.state.entries.filter( entry => entry.id !== entryId)
    })
  }

  handleAddDest = (newDest) => {
    return this.setState({
      destinations: 
      [
        ...this.state.destinations,
      newDest
      ]
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

  handleAddEntry = (newEntry) => {
    this.setState({
      entries: [...this.state.entries, newEntry]
    })
  }

  handleEditDest = updateDest => {
    const newDestinations = this.state.destinations.map(dest => 
      (dest.dest_id === updateDest.dest_id)
        ? updateDest
        : dest
    )
    this.setState({
      destinations: newDestinations
    })
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
      addDest: this.handleAddDest,
      addItem: this.handleAddItem,
      addEntry: this.handleAddEntry,
      editDest: this.handleEditDest,
    }
    return (
      <ApiContext.Provider value={value}>
        {this.props.children}
      </ApiContext.Provider>
    )
  }
}