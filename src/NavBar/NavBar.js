import React, { Component } from 'react'
import { Link } from 'react-router-dom'

export default class NavBar extends Component {
  render() {
    return (
      <>
        <nav className='NavBar'>
          <div className='NavBar-logo'>
            <Link to='/destinations'>
              {' '}
              TT
            </Link>
          </div>
          <div className='NavBar-menu'>
            Menu
          </div>
        </nav>
      </>
    )
  }
}
