import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import TokenService from '../services/token-service'
import ApiContext from '../ApiContext'
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
    console.log('loggedIn:', this.state.loggedIn)
    console.log('has auth token:', TokenService.hasAuthToken())
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
              {' '}
              <i className="fa far fa-compass"></i>

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
