import React, { Component } from 'react'
import logo from './img/Pikachu.png'
import './App.css'
import Menu from './components/Common/Menu'
import Register from './components/User/Register'
import Login from './components/User/Login';

class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      menuLinks: '',
      route: 'login'
    }
  }

  showApropriatePage = () => {
    let route = this.state.route    
    if ( route === 'login') {
      return <Login route={() => this.setRoute() }/>
    } else if( route === 'loggedIn'){

    }
    return <Register />
  }

  setRoute = (route) => {
    this.setState({ route: route })
    this.setMenuLinks()
  }

  componentDidMount = () => {
    this.setMenuLinks()
  }

  logout = () => {
    localStorage.setItem('token', '')
    this.setRoute('login')
  }

  setMenuLinks = () => {
    let loginLink = ''
    let reisterLink = ''
    let logoutLink = ''
    let welcomeMessage = ''

    const menuItems = {
      login: <li className="nav-item"><a className="nav-link" onClick={() => { this.setRoute('login') }}>Login</a></li>,
      register: <li className="nav-item"><a className="nav-link" onClick={() => { this.setRoute('register') }}>Register</a></li>,
      logout: <li className="nav-item"><a className="nav-link" onClick={() => this.logout()}>Logout</a></li>,
      welcome: <li className="nav-item"><a className="nav-link" >Welcome, {localStorage.getItem('name')}</a></li>
    } 
    
    if (!localStorage.getItem('token')) {
      loginLink = menuItems.login
      reisterLink = menuItems.register
      logoutLink = ''
    } else {
      loginLink = ''
      reisterLink = ''
      logoutLink = menuItems.logout
      welcomeMessage = menuItems.welcome
    }

    this.setState({
      menuLinks: (
        <ul className="nav justify-content-end">
          {welcomeMessage}
          {reisterLink}
          {loginLink}
          {logoutLink}
        </ul>
      )
    })
  }

  render() {
    return (
      <div className='App'>
        <header className='App-header'>
          <link rel='stylesheet' href='https://stackpath.bootstrapcdn.com/bootstrap/4.1.1/css/bootstrap.min.css'
            integrity='sha384-WskhaSGFgHYWDcbwN70/dfYBj47jz9qbsMId/iRN3ewGhXQFZCSftd1LZCfmhktB'
            crossOrigin='anonymous' />
          <img src={logo} alt='logo' width='60px' className='d-inline-block mr-2' />

          <h1 className='App-title d-inline-block'>Welcome to Pokemon Roster</h1>
          <Menu links={this.state.menuLinks} />
        </header>
        <div className='container'>
          {this.showApropriatePage()}
        </div>
      </div>
    )
  }
}

export default App
