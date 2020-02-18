import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import TokenService from '../services/token-service'
import ApiContext from '../ApiContext'

export default class NavBar extends Component {
  static contextType = ApiContext
  handleLogoutClick = () => {
    TokenService.clearAuthToken()
    this.context.handleAuthToken(null)
  }
  
  renderLogoutLink() {
    return (
      <div className='NavBar__logged-in'>
        <Link
          onClick={this.handleLogoutClick}
          to='/'>
          Logout
        </Link>
      </div>
    )
  }

  renderLoginLink() {
    return (
      <div className='NavBar__not-logged-in'>
        <Link
          to='/sign-up'>
          Sign-up
        </Link>
        
        <Link
          to='/login'>
          Login
        </Link>
      </div>
    )
  }

  render() {
    console.log(this.context.authToken)
    return (
      <>
        <nav className='NavBar'>
          <div className='NavBar-logo'>
            <Link to='/'>
              {' '}
              TT
            </Link>
          </div>
          <div className='NavBar-menu'>
            {
              !!this.context.authToken
                ? this.renderLogoutLink()
                : this.renderLoginLink()
            }
          </div>
        </nav>
      </>
    )
  }
}
