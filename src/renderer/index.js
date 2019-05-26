import React from 'react'
import ReactDOM from 'react-dom'
import App from './components/App'
import PlayerContextProvider from './context/PlayerContext'
import LibraryContextProvider from './context/LibraryContext'
import PlaylistContextProvider from './context/PlaylistContext'

const MOUNT_NODE = document.getElementById('app')

ReactDOM.render(
	<LibraryContextProvider>
		<PlaylistContextProvider>
			<PlayerContextProvider>
				<App />
			</PlayerContextProvider>
		</PlaylistContextProvider>
	</LibraryContextProvider>,
	MOUNT_NODE
)

module.hot.accept()
