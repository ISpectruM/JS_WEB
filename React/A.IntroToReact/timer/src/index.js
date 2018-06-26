import ReactDOM from 'react-dom'
import './index.css'
import App from './App'

const render = () => ReactDOM.render(App(), document.getElementById('root'))
setInterval(render, 1000)
