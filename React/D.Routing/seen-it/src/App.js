import React, { Component } from 'react'
import {Route} from 'react-router-dom'
import './App.css'
import './style/comments.css'
import './style/header.css'
import './style/menu.css'
import './style/notifications.css'
import './style/post.css'
import './style/site.css'
import './style/submit.css'

import Header from './Components/Common/Header'
import Menu from './Components/Common/Menu'
import Home from './Components/Home/Home'
import Logout from './Components/User/Logout'
import Catalog from './Components/Posts/Catalog'

class App extends Component {
  render () {
    return (
      <div className='App'>
        <Header />
        <div className='content'>
          <Menu />
          <Route path='/' exact component={Home} />
          <Route path='/logout' exact component={Logout} />
          <Route path='/catalog' exact component={Catalog} />
        </div>
        <footer>SeenIt SPA © 2017</footer>
      </div>
    )
  }
}

export default App
