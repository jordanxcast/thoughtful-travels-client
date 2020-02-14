import React, { Component } from 'react'
// import { format } from 'date-fns'
import ApiContext from '../ApiContext'
import config from '../config'
import './Entry.css'

class Entry extends Component {
  static contextType = ApiContext;

  handleClickDelete = e => {
    e.preventDefault()
    const entryId = this.props.id
    console.log('entryId:', entryId)
   
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
        console.log('entries state in handleDeleteEntry:', this.context.entries)

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
        <div className='Entry-subject'>
          {subject}
        </div>
        <div className='Entry-date'>
          Created on:
          <span className='Date'>{created}</span>
        </div>
      
        <div className='Entry-body'>
        {body}
        </div>
        <button type='button' className='Entry-delete' onClick={this.handleClickDelete}>
          X
        </button>
      </div>
    )
     
    
  }
}

export default Entry;