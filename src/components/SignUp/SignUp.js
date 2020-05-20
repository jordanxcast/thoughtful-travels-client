import React, { Component } from 'react'
import TokenService from '../../services/token-service'
import AuthApiService from '../../services/auth-api-services'
import ApiContext from '../../ApiContext'
import './SignUp.css'

export default class SignUpForm extends Component {
static contextType = ApiContext

  constructor(props) {
    super(props)
    this.state = {
      error: null,
      username: '',
      password: '',
    }
  }

  handleSignUpSuccess = user => {
    AuthApiService.fetchAccount({username: this.state.username, password: this.state.password})
    .then( res => {
      TokenService.saveAuthToken(res.authToken)
      this.context.handleAuthToken(res.authToken)
    })
    .then(res => {
      this.props.history.push('/destinations')
    })
  }

  handleSubmit = ev => {
    ev.preventDefault()
    const { full_name, user_name, password } = ev.target
    this.setState({
      username: user_name.value,
      password: password.value,
    })
    AuthApiService.postUser({
      username: user_name.value,
      password: password.value,
      fullname: full_name.value,
    })
      .then(user => {
        this.setState({
          username: user_name.value,
          password: password.value,
          authToken: null,
        })
      })
      .then(user => {
        this.handleSignUpSuccess()
      })
      .catch(res => {
        this.setState({error: res.error})
      })
  }

  render() {
    return (
      <div className='SignUp'>
        <form
          className='SignUpForm'
          onSubmit={this.handleSubmit}
        >
          <h1>Create Account</h1>
          {/* <div role='alert'>
            {error && <p className='red'>{error}</p>}
          </div> */}
          <div className='full_name'>
            <label htmlFor='SignUpForm__full_name'>
              *Full Name 
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
              *Username 
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
              *Password 
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
      </div>
    )
  }
}