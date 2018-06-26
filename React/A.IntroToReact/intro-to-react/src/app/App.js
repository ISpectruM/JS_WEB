import React from 'react'
import './style/App.css'
import ContactsList from './contacts.json'
import rerender from '../index'
import props from './content'

let currentContactIndex = 0

function makeContact (data) {
  let contacts = []

  for (const contact of data) {
    let index = contacts.length
    contacts.push((<div className='contact' key={contact.email} data-id='id' onClick={e => showCurrentContactDetails(index, e)}>
      <span className='avatar small'>&#9787;</span>
      <span className='title'>{contact.firstName} {contact.lastName}</span>
    </div>))
  }
  return contacts
}

const showCurrentContactDetails = (index) => {
  currentContactIndex = index
  rerender(App(props), document.getElementById('root'))
}

const App = (props) => (
  <div className='container'>
    <header>&#9993; Contact Book</header>
    <div id='book'>
      <div id='list'>
        <h1>Contacts</h1>
        <div className='content'>
          {makeContact(ContactsList)}
        </div>
      </div>
      {props.details(ContactsList[currentContactIndex])}
    </div>
    {props.footer}
  </div>)

export default App
