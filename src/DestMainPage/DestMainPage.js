import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import ApiContext from '../ApiContext'
import config from '../config'
import Item from '../Item/Item'
import Entry from '../Entry/Entry'
import './DestMainPage.css'

class DestMainPage extends Component {
  static contextType = ApiContext;

  constructor(props) {
    super(props)
    this.state ={ 
      currentDest: {}
    }
  }

  //grab this value this.props.match.params.destId and send to the get fetch request 
  componentDidMount() {
    const destId = this.props.match.params.destId
    this.getDestination(destId)
    this.context.getItems(destId);
    this.context.getEntries(destId);
  }

  getDestination = (destId) => {
    fetch(`${config.API_ENDPOINT}/destinations/${destId}`, {
      method: 'GET',
      headers: {
        'content-type': 'application/json',
        'Authorization': `Bearer ${this.context.authToken}`,
      }
    })
    .then(res => {
      if(!res.ok) {
        return res.json()
        .then(e => Promise.reject(e))
      }
      return res.json()
    })
    .then((dest) => {
      console.log(dest)
      this.setState({
        currentDest : dest
      })
      console.log('current dest:', dest)
    })
    .catch(err => {
      console.error({ err })
    })
  }

  handleClickDelete = e => {
    e.preventDefault()
    const destId = this.props.match.params.destId

    fetch(`${config.API_ENDPOINT}/destinations/${destId}`, {
      method: 'DELETE',
      headers: {
        'content-type': 'application/json',
        'Authorization': `Bearer ${this.context.authToken}`,
      },
    })
      .then(res => {
        if(!res.ok) {
          return res.json()
          .then(e => Promise.reject(e))
        }
      })
      .then(() => {
        this.context.deleteDest(destId)
        this.props.history.push(`/destinations`)
      })
      .catch(err => {
        console.error({ err })
      })
  }
  render() {
    const { items, entries } = this.context;
    const destId = this.props.match.params.destId
    // const destination = destinations.find((d) => { return d.dest_id = destId})
    // console.log('dest found:',destination)

    return (
      <>
        <section className='DestMainPage-overview'>
          <h1>{this.state.currentDest.dest_title} </h1>
          {this.state.currentDest.goal_date}
          {this.state.currentDest.budget}
          <div className='DestMainPage-buttons'>
            <button className='Dest-complete' type='button'> Completed </button>
            {/* <button className='Dest-edit' type='button'>Edit</button> */}
            <button className='Dest-delete' type='button' onClick={this.handleClickDelete}>Delete</button>
          </div>
        </section>
        <section className='DestMainPage-items'>
          {items.map(item => {
            return <Item 
              key={item.item_id}
              id={item.item_id}
              content={item.item_content}
            />
          })}
          <button type='button'>
            <Link to={`/${destId}/add-item`}>
              + Add Item
            </Link>
        </button>
        </section>
        <section className='DestMainPage-entries'>
          <h2 className='Entry-header'>My Entries</h2>
          <button>
            <Link className='Add-entry' to={`/${destId}/add-entry`}> 
              + Journal Entry 
            </Link>
          </button>

          {entries.map(entry => {
            return <Entry 
              key={entry.id}
              id={entry.id}
              subject={entry.subject}
              body={entry.body}
              created={entry.date_created}
            />
          })}
        </section>
      </>
    )
  }
}

export default DestMainPage;