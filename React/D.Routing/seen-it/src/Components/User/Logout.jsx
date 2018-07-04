import React from 'react'
import {Redirect} from 'react-router-dom'
import authenticator from '../../Services/authenticator'
import Observer from '../../Services/observer'

export default class Logout extends React.Component {
  logout = () => {
    authenticator.logout()
    authenticator.clearSession()
    Observer.trigger(Observer.events.loginUser, null)
  }

  componentDidMount(){
    this.logout()
  }

  render = () => <Redirect to='/' />
}