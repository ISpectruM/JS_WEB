import React from 'react'
import Login from '../User/Login'
import Register from '../User/Register'
import About from './About'

export default class UserSection extends React.Component {
  render () {
    return (
      <section id='viewWelcome'>
        <div className='welcome'>
          <div className='signup'>
            <Login {...this.props} />
            <Register />
          </div>
          <About />
        </div>
      </section>
    )
  }
}
