import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'
import ApiContext from '../../ApiContext'
import './DestListPage.css'
import TokenService from '../../services/token-service'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

class DestListPage extends Component {
  static contextType = ApiContext;

  componentDidMount() {
    this.context.getDestinations()
    if(!this.context.authToken){
      this.props.history.push('/login')
      TokenService.clearAuthToken()
  }
  }

  render(){
    const { destinations } = this.context;
    
    return (
      <div className='DestListPage'>
        <h1 className='DestList-header'>My Destinations</h1>
        
        <ul className='DestListPage_List'>
          {destinations.map(dest => 
            <li key={dest.dest_id} className='DestList-item'>
              <NavLink      
                className='DestLink'
                to={`/destinations/${dest.dest_id}`}
              >
                {dest.dest_title}
              </NavLink>
              <div className='DestDetails_Container'>
                <div className='DestDetails_Date'>
                  Date: {dest.goal_date ? new Date(dest.goal_date).toDateString() : dest.goal_date}
                  {/* {new Intl.DateTimeFormat("en-GB", {
                    year: "numeric",
                    month: "long",
                    day: "2-digit"
                  }).format(dest.goal_date)} */}
                </div>
                <div className='DestDetails_Budget'>
                  Budget: ${dest.budget}
                </div>
              </div>
            </li>
          )}
        </ul>
        <NavLink to='/add-destination' className='DestList-add-dest'>
          <FontAwesomeIcon icon='plus-circle'/> Destination
        </NavLink>
      </div>
    );
  }
}

export default DestListPage;