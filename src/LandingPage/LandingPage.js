import React, { Component } from 'react'
import { Link } from 'react-router-dom'


export default class LandingPage extends Component {


render() {

  return (
    <main>
      <header>
        <h1>
          Traveling Thoughts Landing Page
        </h1>
      </header>
      <section className='SignUp'>
        Click here to make an account 
        <Link
          to='/sign-up'>
          Sign-up
        </Link>
      </section>
      <section className='Login'>
        Already have an account? Login here
        <Link
          to='/login'>
          Login
        </Link>
      </section>
    </main>
  )
  }
}