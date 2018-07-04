import React from 'react'
import { Link } from 'react-router-dom'
import Observer from '../../Services/observer';

export default class Header extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      username: null
    }

    Observer.subscribe(Observer.events.loginUser, this.userLoggedIn)
  }

  userLoggedIn = (username) => {
    this.setState({ username })
  }

  componentDidMount () {
    if (sessionStorage.username) {
      let username = sessionStorage.username
      this.setState({username})
    }
  }

  render() {
    let loggedInLinks =
      <div id='profile'>
        <span>Hello, {this.state.username}</span>|
        <Link to='/logout'>Logout</Link>
      </div>
    return (
      <header>
        <span className='logo'>☃</span>
        <span className='header'>SeenIt</span>
        {this.state.username ? loggedInLinks : null}
      </header>)
  }
}
