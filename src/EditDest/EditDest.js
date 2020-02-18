import React, {Component} from 'react'
import ApiContext from '../ApiContext'
import config from '../config'
import './EditDest.css'

class EditDest extends Component {
  handleEditSubmit(e) {
    e.preventDefault()

    const destTitle = e.target.destName.value
    const destDate = e.target.destDate.value
    const destBudget = e.target.destBudget.value
    const destId = this.props.match.params.destId

    const editDestEndpoint = `${config.API_ENDPOINT}/destinations/${destId}`
    const options = {
      method: 'POST',
      body: JSON.stringify({
        //destination inputs
        dest_id: destId,
        dest_title: destTitle,
        goal_date: destDate,
        budget: destBudget
      }),
      headers: {
        'content-type': 'application/json'
      }
    }

    fetch(editDestEndpoint, options)
    .then(res => {
      if(!res.ok) {
        throw new Error('Something went wrong, please try again later')
      }
      return res.json()
    })
    .then(dest => {

    })

  }


  static contextType = ApiContext
  render() {
    const destId = this.props.match.params.destId
    return (
      <div className='EditDest'>
        <form
          className='EditDest-form'
          onSubmit={(e) => this.handleSubmit(e)}
        >
          <h2>Edit Destination</h2>
          <div className='form-group'>
            {/* New Destination Title */}
            <label htmlFor='dest-name'>Destination Title:</label>
            <input className='dest-name' id='dest-name' name='destName' type='text'/>

            {/* New Goal Date */}
            <label htmlFor='dest-date'>Goal Date</label>
            <input className='dest-date' id='dest-date' name='destDate' type='text'/>

            {/* New Budget */}
            <label htmlFor='dest-budget'>Budget</label>
            <input className='dest-budget' id='dest-budget' name='destBudget' type='text'/>
          </div>

          <div className='edit-dest-button-group'>
            <button
              type='reset'
              className='edit-dest-button'
              onClick={() => this.props.history.push(`/destinations/${destId}`)}
            >
              Cancel
            </button>
            <button
              type='submit'
              className='edit-dest-button'
            >
              Save Destination
            </button>
          </div>
        </form>
      </div>
    )
  }
}
export default EditDest