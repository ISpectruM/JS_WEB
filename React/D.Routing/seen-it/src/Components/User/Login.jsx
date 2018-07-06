import React from 'react'
import authenticator from '../../Services/authenticator';
import Observer from '../../Services/observer';

export default class Login extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      username: null,
      password: null
    }
  }

  handleInput = (event) => {
    let state = this.state
    let inputTag = event.target.id
    let inputValue = event.target.value

    state[inputTag] = inputValue
    this.setState(state)
  }

  submitData = (event) => {
    event.preventDefault()

    authenticator.login(this.state.username, this.state.password)
    .then((userInfo) => {
      Observer.trigger(Observer.events.loginUser, userInfo.username)
      authenticator.saveSession(userInfo)
      console.log(this.props)
      this.props.history.push('/catalog')
    })
  }

  render () {
    return (
      <form id='loginForm' onSubmit={this.submitData}>
        <h2>Sign In</h2>
        <label>Username:</label>
        <input id='username' name='username' type='text' onChange={this.handleInput} />
        <label>Password:</label>
        <input id='password' name='password' type='password' onChange={this.handleInput} />
        <input id='btnLogin' value='Sign In' type='submit' />
      </form>
    )
  }
}
