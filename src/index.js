import React from 'react'
import ReactDOM from 'react-dom'
import App from './components/App'
import SongContextProvider from './context/Song'

const MOUNT_NODE = document.getElementById('app')

ReactDOM.render(
	<SongContextProvider>
		<App />
	</SongContextProvider>,
	MOUNT_NODE
)

module.hot.accept()
