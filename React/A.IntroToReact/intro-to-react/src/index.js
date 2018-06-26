import ReactDOM from 'react-dom'
import './index.css'
import './app/style/App.css'
import App from './app/App'
import props from './app/content'

const rerender = ReactDOM.render
ReactDOM.render(App(props), document.getElementById('root'))
export default rerender
