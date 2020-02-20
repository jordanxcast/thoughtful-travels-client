import React, { Component } from 'react'
import AuthApiService from '../services/auth-api-services'
import './SignUp.css'

export default class SignUpForm extends Component {
  static defaultProps = {
    history: {
      push: () => {},
    },
  }

  state = { error: null }

  handleSignUpSuccess = user => {
    const { history } = this.props
    history.push('/login')
  }

  handleSubmit = ev => {
    ev.preventDefault()
    const { full_name, user_name, password } = ev.target

    this.setState({ error: null })
    AuthApiService.postUser({
      username: user_name.value,
      password: password.value,
      fullname: full_name.value,
    })
      .then( user => {
        user_name.value = ''
        password.value = ''
        full_name.value = ''
      })
      .catch(res => {
        this.setState({error: res.error})
        console.log(res)
      })
  }

  render() {
    // const { error } = this.state
    return (
      <form
        className='SignUpForm'
        onSubmit={this.handleSubmit}
      >
        {/* <div role='alert'>
          {error && <p className='red'>{error}</p>}
        </div> */}
        <div className='full_name'>
          <label htmlFor='SignUpForm__full_name'>
            Full Name 
          </label>
          <input
            name='full_name'
            type='text'
            required
            id='SignUpForm__full_name'>
          </input>
        </div>
        <div className='user_name'>
          <label htmlFor='SignUpForm__user_name'>
            Username 
          </label>
          <input
            name='user_name'
            type='text'
            required
            id='SignUpForm__user_name'>
          </input>
        </div>
        <div className='password'>
          <label htmlFor='SignUpForm__password'>
            Password 
          </label>
          <input
            name='password'
            type='password'
            required
            id='SignUpForm__password'>
          </input>
        </div>
        <button type='submit' className='SignUp-submit'>
          Sign Up
        </button>
      </form>
    )
  }
}