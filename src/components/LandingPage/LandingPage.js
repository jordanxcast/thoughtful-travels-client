import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import DestView from '../../Images/laptop-dest-list-view.png'
import DestMain from '../../Images/laptop-dest-main-view.png'
import EntriesView from '../../Images/laptop-entries-view.png'
import './LandingPage.css'


export default class LandingPage extends Component {

render() {

  return (
    <main>
      <header className='LP-header'>
        <h1>
          Thoughtful Travels <FontAwesomeIcon icon='compass'/>
        </h1>
        <h2>
          Your Journey, Your Experience
        </h2>
      </header>
      <div className='LP-sections'>
      <section className='LP-section'>
        <header>
          <h3 className='LP-section-header'>Make your travel goals come true</h3>
        </header>
        <img src={DestView} alt='destination list page view' className='LP-image'/>
        <p>Thoughtful Travels is a place to set your traveling goals, plan your trips and document your experiences. </p>
      </section>
      <section className='LP-section'>
        <header>
          <h3 className='LP-section-header'>Set your Travel Goals</h3>
        </header>
        <img src={DestMain} alt='destination main page view' className='LP-image'/>
        <p>The first start to making your goals happen is setting them. Set your goals and start planning your travels with all the bucket-list items your trip can consist of. </p>
      </section>
      <section className='LP-section'>
        <header>
          <h3 className='LP-section-header'>Reflect on Your Experience</h3>
        </header>
        <img src={EntriesView} alt='destination entries view' className='LP-image'/>
        <p>Accomplishing a goal is a great feeling, and gaining a new experience through traveling is invaluable. Reflect on the travel goals you complete with a journal entry, documenting the moments you never want to forget.</p>
      </section>
      <section className='LP-signUp'>
        <h3 className='LP-section-header'>Begin your Thoughtful Travels Now</h3>
        <button className='LP-link-button'><Link
        className='LP-link'
          to='/sign-up'>
          Sign-up
        </Link></button>
      </section>
      <section className='LP-Login'>
        <h3 className='LP-section-header'>Already have an account?</h3>
        <button className='LP-link-button'><Link
          className='LP-link'
          to='/login'>
          Login
        </Link></button>
      </section>
      </div>
    </main>
  )
  }
}