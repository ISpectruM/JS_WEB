import React from 'react'
import './App.css'

const App = () => (
  <div className='App'>
    <header className='App-header'>
      <h1>{ new Date(Date.now()).toLocaleTimeString()}</h1>
    </header>
  </div>
)

export default App
