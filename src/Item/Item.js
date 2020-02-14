import React, { Component } from 'react'
import ApiContext from '../ApiContext'
import config from '../config'
import './Item.css'

class Item extends Component {
  static contextType = ApiContext

  handleClickDelete = e => {
    e.preventDefault()
    const itemId = this.props.id
    console.log('itemId:', itemId)

    fetch(`${config.API_ENDPOINT}/items/${itemId}`, {
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
        this.context.deleteItem(itemId)
      })
      .catch(err => {
        console.error({ err })
      })
  }
  render(){
    const { id, content } = this.props
    return (
      <div className='Item' id={id}>
        <button type='button' className='Item-delete' onClick={this.handleClickDelete}>X</button>
        <div className='Item-content'>
          {content}
        </div>
      </div>
    )
  }
}

export default Item;