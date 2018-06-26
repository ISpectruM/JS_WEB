import React from 'react'
import './App.css'
import rerender from './index'

let counter = 0
const increment = () => {
  counter++
  rerender(App(), document.getElementById('root'))
}

const resetCounter = () => {
  counter = 0
  rerender(App(), document.getElementById('root'))
}

const App = () => (
  <div className='App'>
    <header className='App-header'>
      <div>{counter}</div>
      <h1 className='App-title'>Welcome to React</h1>
    </header>
    <button onClick={increment}>Increment</button>
    <button onClick={resetCounter}>Reset</button>
  </div>
)

export default App
