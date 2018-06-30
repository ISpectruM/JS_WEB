import React from 'react'

class Login extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      email: '',
      password: '',
      error: ''
    }
  }

  handleSubmit = () => {
    if (this.state.email === '' && this.state.password === '') {
      this.setState({ error: 'Fields can`t be empty!' })
    } else if (this.state.password === '') {
      this.setState({ error: 'Password can`t be empty!' })
    } else if (this.state.email === '') {
      this.setState({ error: 'Email can`t be empty!' })
    }
    fetch('http://localhost:5000/auth/login',
      {
        method: 'POST',
        body: JSON.stringify(this.state),
        headers: {
          'content-type': 'application/json'
        }
      }
    )
      .then(data => data.json())
      .then(response => {
        if (response.success && response.token) {
          localStorage.setItem('token', response.token)
          localStorage.setItem('name', response.user.name)
          localStorage.setItem('route', 'loggedIn')
          this.props.route('loggedIn')
        } else {
          this.setState({error: 'Wrong email or password!'})
        }
      })
      .catch(err => {
        console.log(err);
      })
  }

  updateProps = (event) => {
    let state = this.state
    let value = event.target.value
    let element = event.target.id

    state[element] = value
    state['error'] = ''
    this.setState(state)
  }

  render() {
    return (
      <form className='col-sm-6 mx-auto'>
        <h1>Login form</h1>
        <div className='form-group'>
          <label htmlFor='email' className='col-form-label'>Email address</label>
          <input type='email' className='form-control' id='email' name='Name' aria-describedby='emailHelp' placeholder='Enter email'
            value={this.state.email}
            onChange={this.updateProps} />
          <small id='emailHelp' className='form-text text-muted'>We'll never share your email with anyone else.</small>
        </div>
        <div className='form-group'>
          <label htmlFor='password'>Password</label>
          <input type='password' className='form-control' id='password' name='Password' placeholder='Password'
            onChange={this.updateProps} />
        </div>
        <button type='button' className='btn btn-primary'
          onClick={this.handleSubmit}>Login</button>
        <div className='error m-3'>{this.state.error}</div>
      </form>)
  }
}

export default Login
