import React, { Component } from 'react'
import ApiContext from '../ApiContext'
import config from '../config'
import './AddEntry.css'

class AddEntry extends Component {
  static contextType = ApiContext
  constructor(props){
    super(props)
    this.state = {
      error: null
    }
  }

  validateEntrySubject(subject) {
    const subjectToVal= subject.trim()
    if(subjectToVal.length === 0) {
      return 'An entry subject is required'
    } else {
      return false
    }
  }

  validateEntryBody(body){
    const bodyToVal = body.trime()
    if(bodyToVal.length === 0) {
      return 'An entry body is required'
    } else {
      return false
    }
  }

  clearError = () => {
    this.setState({
      error: null
    })
  }

  handleSubmit(e) {
    e.preventDefault()

    const destId = this.props.match.params.destId
    const entrySubject = e.target.entrySubject.value
    const entryBody = e.target.entryBody.value   

    const error = this.validateEntrySubject(entrySubject) && this.validateEntryBody(entryBody)
    
    if(error) {
      this.setState({
        error
      })
    } else {
      //dest_title, goal_date, budget
      const addEntryEndpoint = `${config.API_ENDPOINT}/entries/${destId}`
      const options = {
        method: 'POST',
        body: JSON.stringify({
          //destination inputs
          subject: entrySubject,
          body: entryBody,
          dest_id: destId
        }),
        headers: {
          'content-type': 'application/json'
        }
      }
      fetch(addEntryEndpoint, options)
      .then(res => {
        if(!res.ok) {
          throw new Error('Something went wrong, please try again later')
        }
        return res.json()
      })
      .then(entry => {
        this.context.addEntry(entry)
        this.props.history.push(`/destinations/${entry.dest_id}`)
      })
      .catch(err => console.error(err.message))
    }
  }

  render() {
    const dest_id = this.props.match.params.destId
    return (
      <div className='AddEntry'>
        <form
          className='AddEntry-form'
          onSubmit={(e) => this.handleSubmit(e)}
        >
          <h2>Add a Journal Entry</h2>
          <div className='AddEntry-form-group'>
            <label htmlFor='entry-subject'>Subject:</label>
            <input className='entry-subject' id='entry-subject' name='entrySubject' type='text'/>
            {/* {this.state.error && (<ValidationError message={this.state.error} clearError={this.clearError}/>)} */}
            <label htmlFor='entry-body'>Journal Entry:</label>
            <textarea className='entry-body' id='entry-body' name='entryBody' type='textarea' cols='10' rows='10'/>
          </div>

          <div className='add-entry-button-group'>
            <button
              type='reset'
              className='cancel-add-entry-button'
              onClick={() => this.props.history.push(`/destinations/${dest_id}`)}
            >
              Cancel
            </button>
            <button
              type='submit'
              className='add-entry-button'
              disabled={this.state.error}
            >
              Save Journal Entry
            </button>
          </div>
        </form>
      </div>
    )
  }
}

export default AddEntry