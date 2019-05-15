import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'

const MOUNT_NODE = document.getElementById('app')
const title = 'Musicion'

ReactDOM.render(<App />, MOUNT_NODE)

module.hot.accept()
