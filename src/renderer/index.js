import React from 'react'
import ReactDOM from 'react-dom'
import App from './components/App'
import PlayerContextProvider from './context/PlayerContext'
import LibraryContextProvider from './context/LibraryContext'
import PlaylistContextProvider from './context/PlaylistContext'
import SettingsContextProvider from './context/SettingsContext'

const MOUNT_NODE = document.getElementById('app')

ReactDOM.render(
	<SettingsContextProvider>
		<LibraryContextProvider>
			<PlaylistContextProvider>
				<PlayerContextProvider>
					<App />
				</PlayerContextProvider>
			</PlaylistContextProvider>
		</LibraryContextProvider>
	</SettingsContextProvider>,
	MOUNT_NODE
)

module.hot.accept()
