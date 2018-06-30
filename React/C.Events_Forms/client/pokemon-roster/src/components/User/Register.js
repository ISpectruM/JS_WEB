import React from 'react'

class Register extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      email: '',
      password: '',
      name: '',
      error: ''
    }
  }

  handleSubmit = () => {
    fetch('http://localhost:5000/auth/signup',
      {
        method: 'POST',
        body: JSON.stringify(this.state),
        headers: {
          'content-type': 'application/json'
        }
      }
    )
      .then(data => data.json())
      .then(response => console.log(response))
      .catch(err => {
        console.log(err);
      })
  }

  updateProps = (event) => {
    let property = this.state
    property[event.target.id] = event.target.value
    this.setState(property)
  }

  render() {
    return (
      <form className='col-sm-6'>
        <h1>Register form</h1>
        <div className='form-group'>
          <label htmlFor='exampleInputEmail1' className='col-form-label'>Email address</label>
          <input type='email' className='form-control' id='email' aria-describedby='emailHelp' placeholder='Enter email'
            value={this.state.email}
            onChange={this.updateProps} />
          <small id='emailHelp' className='form-text text-muted'>We'll never share your email with anyone else.</small>
        </div>
        <div className='form-group'>
          <label htmlFor='password'>Password</label>
          <input type='password' className='form-control' id='password' placeholder='Password'
            onChange={this.updateProps} />
        </div>
        <div className='form-group'>
          <label htmlFor='name'>Password</label>
          <input type='text' className='form-control' id='name' placeholder='Username'
            onChange={this.updateProps} />
        </div>
        <div>{this.state.error}</div>
        <button type='button' className='btn btn-primary'
          onClick={this.handleSubmit}>Submit</button>
      </form>)
  }
}

export default Register
