import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import './LandingPage.css'


export default class LandingPage extends Component {


render() {

  return (
    <main>
      <header className='LP-header'>
        <h1>
          Thoughtful Travels
        </h1>
        <h2>
          Your Journey, Your Experience
        </h2>
      </header>
      <div className='LP-sections'>
      <section >
        <header>
          <h3>Make your travel goals come true</h3>
        </header>
        <p>[<em>placeholder for screenshot Thoughtful Travels interface</em>]</p>
        <p>Thoughtful Travels is a place to set your traveling goals, plan your trips and document your experiences. </p>
      </section>
      <section>
        <header>
          <h3>Set your Travel Goals</h3>
        </header>
        <p>[<em>placeholder for screenshot Thoughtful Travels interface</em>]</p>
        <p>The first start to making your goals happen is setting them. Set your goals and start planning your travels with all the bucket-list items your trip can consist of. </p>
      </section>
      <section>
        <header>
          <h3>Reflect on Your Experience</h3>
        </header>
        <p>[<em>placeholder for screenshot Thoughtful Travels interface</em>]</p>
        <p>Accomplishing a goal is a great feeling, and gaining a new experience through travelling is invaluable. Reflect on the travel goals you complete with a journal entry, documenting the moments you never want to forget.</p>
      </section>
      <section className='SignUp'>
        <h3>Begin your Thoughtful Travels Now</h3>
        <Link
        className='LP-link'
          to='/sign-up'>
          Sign-up
        </Link>
      </section>
      <section className='Login'>
        <h4>Already have an account?</h4>
        <Link
          className='LP-link'
          to='/login'>
          Login
        </Link>
      </section>
      </div>
    </main>
  )
  }
}