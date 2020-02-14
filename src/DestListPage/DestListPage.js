import React, { Component } from 'react'
import { NavLink, Link } from 'react-router-dom'
import ApiContext from '../ApiContext'
import './DestListPage.css'

class DestListPage extends Component {

  static contextType = ApiContext;
  render(){
    const { destinations } = this.context;
    console.log('DestListPage component:', destinations)
    return (
      <div className='DestListPage'>
        <Link to='/add-destination'>
          + Add Destination
        </Link>
        <ul className='DestListPage_List'>
          {destinations.map(dest => 
            <li key={dest.dest_id}>
              <NavLink      
                className='DestLink'
                to={`destinations/${dest.dest_id}`}
              >
                {dest.dest_title}
              </NavLink>
              <div className='DestDetails_Container'>
                <div className='DestDetails_Date'>Date: {dest.goal_date}</div>
                <div className='DestDetails_Budget'>Budget: {dest.budget}</div>
              </div>
            </li>
          )}
        </ul>

      </div>
    );
  }
}

export default DestListPage;