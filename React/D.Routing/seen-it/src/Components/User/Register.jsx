import React from 'react'
import authenticator from '../../Services/authenticator'
import Observer from '../../Services/observer'

export default class Register extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      username: null,
      password: null
    }
  }

  handleInput = (event) => {
    let state = this.state
    let inputTag = event.target.name
    let inputValue = event.target.value

    state[inputTag] = inputValue
    this.setState(state)
  }

  submitData = (event) => {
    event.preventDefault()

    authenticator.register(this.state.username, this.state.password)
    .then(userInfo => {
      Observer.trigger(Observer.events.loginUser, userInfo.username)
      authenticator.saveSession(userInfo)
    })
    .catch(console.log)
  }

  render () {
    return (
      <form id='registerForm' onSubmit={this.submitData}>
        <h2>Register</h2>
        <label>Username:</label>
        <input name='username' type='text' onChange={this.handleInput}/>
        <label>Password:</label>
        <input name='password' type='password' onChange={this.handleInput}/>
        <label>Repeat Password:</label>
        <input name='repeatPass' type='password' />
        <input id='btnRegister' value='Sign Up' type='submit' />
      </form>
    )
  }
}
