import React from 'react'
import ReactDOM from 'react-dom'
import App from './components/App'
import SongContextProvider from './context/Song'
import LibraryContextProvider from './context/Library'

const MOUNT_NODE = document.getElementById('app')

ReactDOM.render(
	<LibraryContextProvider>
		<SongContextProvider>
			<App />
		</SongContextProvider>
	</LibraryContextProvider>,
	MOUNT_NODE
)

module.hot.accept()
