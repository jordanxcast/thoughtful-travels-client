import React, { Component } from 'react'
import ApiContext from '../ApiContext'
import config from '../config'
import './AddItem.css'

class AddItem extends Component {
  static contextType = ApiContext
  constructor(props){
    super(props)
    this.state = {
      error: null
    }
  }

  validateItemContent(value) {
    const item = value.trim()
    if(item.length === 0) {
      return 'An item is required to save'
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
    const itemContent = e.target.itemContent.value    


    const error = this.validateItemContent(itemContent)
    
    if(error) {
      this.setState({
        error
      })
    } else {
      //dest_title, goal_date, budget
      const addEntryEndpoint = `${config.API_ENDPOINT}/items/${destId}`
      const options = {
        method: 'POST',
        body: JSON.stringify({
          //destination inputs
          item_content: itemContent,
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
      .then(item => {
        this.context.addItem(item)
        this.props.history.push(`/destinations/${item.dest_id}`)
      })
      .catch(err => console.error(err.message))
    }
  }

  render() {
    const dest_id = this.props.match.params.destId
    return (
      <div className='AddItem'>
        <form
          className='AddItem-form'
          onSubmit={(e) => this.handleSubmit(e)}
        >
          <h2>Add a Bucketlist Item</h2>
          <div className='form-group'>
            <label htmlFor='Item-content'>Item:</label>
            <input className='item-content' id='item-content' name='itemContent' type='text'/>
            {/* {this.state.error && (<ValidationError message={this.state.error} clearError={this.clearError}/>)} */}
            
          </div>

          <div className='add-item-button-group'>
            <button
              type='reset'
              className='cancel-add-item-button'
              onClick={() => this.props.history.push(`/destinations/${dest_id}`)}
            >
              Cancel
            </button>
            <button
              type='submit'
              className='add-item-button'
              disabled={this.state.error}
            >
              Save
            </button>
          </div>
        </form>
      </div>
    )
  }
}

export default AddItem