import React from 'react'
import { Link } from 'react-router-dom'

export default class Menu extends React.Component {
  render () {
    return (<div id='menu'>
      <div className='title'>Navigation</div>
      <Link className='nav' to='/catalog'>Catalog</Link>
      <Link className='nav' to='/submit'>Submit Link</Link>
      <Link className='nav' to='/userposts'>My Posts</Link>
    </div>)
  }
}
