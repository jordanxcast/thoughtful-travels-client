import React, { Component } from 'react'
import TokenService from '../services/token-service'
import AuthApiService from '../services/auth-api-services'
import ApiContext from '../ApiContext'

export default class Login extends Component {
static contextType = ApiContext


handleSubmitBasicAuth = e => {
  e.preventDefault()
  const { user_name, password } =e.target
  
  TokenService.saveAuthToken(
    TokenService.makeBasicAuthToken(user_name.value, password.value)
  )

  user_name.value=''
  password.value=''
}

handleSubmitJwtAuth = e => {
  e.preventDefault()
  this.setState({ error: null })
  const { user_name, password } = e.target

  AuthApiService.postLogin({
    username: user_name.value,
    password: password.value,
  })
    .then(res => {
      console.log(res)
      user_name.value = ''
      password.value = ''
      TokenService.saveAuthToken(res.authToken)
      this.context.handleAuthToken(res.authToken)
      this.props.history.push(`/destinations`)
    })
    .catch(res => {
      this.setState({ error: res.error })
    })

}

render() {

  return (
    <form
      className='Login'
      onSubmit={this.handleSubmitJwtAuth}
    >
      <div className='user_name'>
        <label htmlFor='Login-user-name'>
          User name
        </label>
        <input
          name='user_name'
          id='Login-user-name'>
        </input>
      </div>
      <div className='password'>
        <label htmlFor='Login-password'>
          Password
        </label>
        <input
          name='password'
          type='password'
          id='Login-password'
        >
        </input>
        <button type='submit'>
          Login
        </button>
      </div>

    </form>
  )
}
}