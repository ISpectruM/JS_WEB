import React from 'react'

export default class Menu extends React.Component {
  render () {
    let links = this.props.links

    return (
      <div>
        {links}
      </div>
    )
  }
}
