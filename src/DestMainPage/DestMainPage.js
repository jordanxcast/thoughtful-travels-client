import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import ApiContext from '../ApiContext'
import config from '../config'
import Item from '../Item/Item'
import Entry from '../Entry/Entry'
import TokenService from '../services/token-service'
import './DestMainPage.css'

class DestMainPage extends Component {
  static contextType = ApiContext;

  constructor(props) {
    super(props)
    this.state ={ 
      currentDest: {},
    }
  }

  //grab this value this.props.match.params.destId and send to the get fetch request 
  componentDidMount() {
    const destId = this.props.match.params.destId
    const authToken = this.context.authToken || TokenService.getAuthToken()
    if (authToken) {
      this.getDestination(destId, authToken)
      this.context.getItems(destId);
      this.context.getEntries(destId);
    } 
  }

  getDestination = (destId, token) => {
    fetch(`${config.API_ENDPOINT}/destinations/${destId}`, {
      method: 'GET',
      headers: {
        'content-type': 'application/json',
        'Authorization': `Bearer ${token}`,
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

  validateDestTitle(value) {
    const title = value.trim()
    if(title.length === 0) {
      return 'A Destination Title is required'
    } else {
      return value
    }
  }

  validateDestDate(value) {
    if(value === '') {
      return null
    } return value
  }

  validateDestBudget(value) {
    if(value === '') {
      return 0
    } return value
  }


  handleClickEdit = e => {
    e.preventDefault()
    const destId = this.props.match.params.destId
    const authToken = TokenService.getAuthToken()

    const destTitle = this.validateDestTitle(e.target.destName.value)
    console.log('new dest title:', destTitle)
    const destDate = this.validateDestBudget(e.target.destDate.value)
    const destBudget = this.validateDestDate(e.target.destBudget.value)


    fetch(`${config.API_ENDPOINT}/destinations/${destId}`, {
      method: 'PATCH',
      headers: {
        'content-type': 'application/json',
        'Authorization': `Bearer ${authToken}`,
      },
      body: JSON.stringify({
          dest_id: destId,
          dest_title: destTitle,
          goal_date: destDate,
          budget: destBudget,
        }),
    })
      .then(res => {
        console.log('res from PATCH request', res)
        if(!res.ok) {
          return res.json()
          .then(e => Promise.reject(e))
        }
        return res.json()
      })
      .then(res => {
        console.log('!res from PATCH request!', res)
        this.context.editDest(res)
      })
      .catch(err => console.error(err.message))
  }

  handleClickDelete = e => {
    e.preventDefault()
    const destId = this.props.match.params.destId
    const authToken = TokenService.getAuthToken()
    fetch(`${config.API_ENDPOINT}/destinations/${destId}`, {
      method: 'DELETE',
      headers: {
        'content-type': 'application/json',
        'Authorization': `Bearer ${authToken}`,
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
      <div className='DestMainPage'>
        <button
              type='button'
              className='DestMainPage-back'
              onClick={() => this.props.history.push(`/destinations`)}
            >
              Go Back
            </button>
        <section className='DestMainPage-overview'>
          <form onSubmit={(e) => this.handleClickEdit(e)}>
          <div>
            <input className='dest-name' id='dest-name' name='destName' type='text' required defaultValue={this.state.currentDest.dest_title} /> 
          </div>
          <div>
            <input className='dest-date' id='dest-date' name='destDate' type='date' defaultValue={this.state.currentDest.goal_date} />  
          </div>
          <div>
            <input className='dest-budget' id='dest-budget' name='destBudget' type='number' defaultValue={this.state.currentDest.budget} /> 
          </div>
          
          <button className='Dest-completed' type='submit' > Save </button>
          </form>
          
          <div className='DestMainPage-buttons'>
            {/* <button className='Dest-edit' type='button'>Edit</button> */}
            <button className='Dest-delete' type='button' onClick={this.handleClickDelete}>Delete</button>
          </div>
        </section>
        <section className='DestMainPage-items'>
        <h2 className='Entry-header'>My Bucket-List Items</h2>
          {items.map(item => {
            return <Item 
              key={item.item_id}
              id={item.item_id}
              content={item.item_content}
            />
          })}
          <button type='button' className='DestMainPage-add'>
            <Link to={`/${destId}/add-item`} className='button-link'>
              + Add Item
            </Link>
        </button>
        </section>
        <section className='DestMainPage-entries'>
          <h2 className='Entry-header'>My Entries</h2>
          <button type='button' className='DestMainPage-add'>
            <Link to={`/${destId}/add-entry`} className='button-link'> 
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
      </div>
    )
  }
}

export default DestMainPage;