import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faCompass} from '@fortawesome/free-solid-svg-icons'
import TokenService from '../../services/token-service'
import ApiContext from '../../ApiContext'
// import IdleService from '../../services/idle-service'
import './NavBar.css'

export default class NavBar extends Component {
  constructor(props) {
    super(props)
    this.state = {
      loggedIn: TokenService.hasAuthToken()
    }
  }
  static contextType = ApiContext

  componentDidMount() {
    if(this.context.authToken || TokenService.hasAuthToken()) {
      this.setState({
        loggedIn: true
      })
    } else {
      this.setState({
        loggedIn: false
      })
    }
  }

  handleLogoutClick = () => {
    TokenService.clearAuthToken()
    this.context.handleAuthToken(null)
    this.setState({
      loggedIn: false
    })
    // TokenService.clearCallbackBeforeExpiry()
    // IdleService.unRegisterIdleResets()
  }
  
  renderLogoutLink() {
    return (
      <div className='NavBar__logged-in'>
        <Link
          className='NavBar-link'
          onClick={this.handleLogoutClick}
          to='/'>
          Logout
        </Link>
      </div>
    )
  }

  renderLoginLink() {
    return (
      <div className='NavBar_not-logged-in'>
        <Link
          className='NavBar-link'
          to='/login'>
          Login
        </Link>
      </div>
    )
  }

  render() {
    
    return (
      <>
        <nav className='NavBar'>
          <div className='NavBar-logo'>
            <Link to='/' className='NavBar-link'>
              <FontAwesomeIcon icon={faCompass} className='NavBar-icon'/>
              {' '}
              TT
            </Link>
          </div>
          <div className='NavBar-menu'>
            {
              this.context.authToken 
                ? this.renderLogoutLink()
                : this.renderLoginLink()
            }
          </div>
        </nav>
      </>
    )
  }
}
