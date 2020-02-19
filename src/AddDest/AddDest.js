import React, { Component } from 'react'
import ApiContext from '../ApiContext'
import config from '../config'
import TokenService from '../services/token-service'

import './AddDest.css'

class AddDest extends Component {
  static contextType = ApiContext
  constructor(props){
    super(props)
    this.state = {
      error: null
    }
  }

  validateDestTitle(value) {
    const title = value.trim()
    if(title.length === 0) {
      return 'A Destination Title is required'
    } else {
      return false
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

  clearError = () => {
    this.setState({
      error: null
    })
  }

  handleSubmit = (e) => {
    e.preventDefault()

    const destTitle = e.target.destName.value
    const destDate = e.target.destDate.value
    const destBudget = e.target.destBudget.value

    const error = this.validateDestTitle(destTitle)
    const budget = this.validateDestBudget(destBudget)
    const goal_date =this.validateDestDate(destDate)
    
    if(error) {
      this.setState({
        error
      })
    } else {
      //dest_title, goal_date, budget
      const addDestEndpoint = `${config.API_ENDPOINT}/destinations`
      const options = {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
          'authorization': `bearer ${TokenService.getAuthToken()}`
        },
        body: JSON.stringify({
          //destination inputs
          dest_title: destTitle,
          goal_date: goal_date,
          budget: budget,
        }),
      }
      fetch(addDestEndpoint, options)
      .then(res => {
        if(!res.ok) {
          throw new Error('Something went wrong, please try again later')
        } 
        return res.json()
      })
      .then(dest => {
        const destId = dest.dest_id;
        console.log('dest ', dest)
        this.context.addDest(dest)
        this.props.history.push(`/destinations/${destId}`)
      })
      .catch(err => console.error(err.message))
    }
  }

  render() {
    return (
      <div className='AddDest'>
        <form
          className='AddDest-form'
          onSubmit={(e) => this.handleSubmit(e)}
        >
          <h2>Add Your Next Destination</h2>
          <div className='form-group'>
            <label htmlFor='dest-name'>Destination Title:</label>
            <input className='dest-name' id='dest-name' name='destName' type='text' required/>
            {/* {this.state.error && (<ValidationError message={this.state.error} clearError={this.clearError}/>)} */}
            <label htmlFor='dest-date'>Goal Date</label>
            <input className='dest-date' id='dest-date' name='destDate' type='date'/>
            <label htmlFor='dest-budget'>Budget</label>
            <input className='dest-budget' id='dest-budget' name='destBudget' type='number'/>
          </div>

          <div className='add-dest-button-group'>
            <button
              type='reset'
              className='add-dest-button'
              onClick={() => this.props.history.push('/destinations')}
            >
              Cancel
            </button>
            <button
              type='submit'
              className='add-dest-button'
              disabled={this.state.error}
            >
              Save Destination
            </button>
          </div>
        </form>
      </div>
    )
  }
}

export default AddDest