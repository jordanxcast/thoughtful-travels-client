import React, { Component } from 'react'
// import { format } from 'date-fns'
import ApiContext from '../ApiContext'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import config from '../config'
import './Entry.css'

class Entry extends Component {
  static contextType = ApiContext;

  handleClickDelete = e => {
    e.preventDefault()
    const entryId = this.props.id
   
    fetch(`${config.API_ENDPOINT}/entries/${entryId}`, {
      method: 'DELETE',
      headers: {
        'content-type': 'application/json'
      },
    })
      .then(res => {
        if(!res.ok) {
          return res.json()
            .then(e => Promise.reject(e))
        }
      })
      .then(() => {
        this.context.deleteEntry(entryId)
      })
      .catch(err => {
        console.error({ err })
      })
  }

  render(){
    const { subject, created, body, id } = this.props
    return (
      <div className='Entry' id={id}>
        <div className='Entry-info-top'>
          <div className='Entry-subject'>
            {subject}
          </div>
          <div className='Entry-date'>
            Created on:
            <div className='Date'>{created}</div>
            
          </div>
        </div>
        <div className='Entry-body-delete'>
          <div className='Entry-body'>
          {body}
          </div>
          <button type='button' className='Entry-delete' onClick={this.handleClickDelete}>
          <FontAwesomeIcon icon='trash' className='delete-dest'/> this entry
          </button>
          </div>
      </div>
    )
  }
}

export default Entry;