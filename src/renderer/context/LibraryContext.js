import React from 'react'
import { ipcRenderer } from 'electron'
import Config from '../services/Config'

const DEFAULT_STATE = {
	albums: {}
}

export const LibraryContext = React.createContext(DEFAULT_STATE)

export default class LibraryContextProvider extends React.Component {
	constructor (props) {
		super(props)
		this.state = DEFAULT_STATE
		Config.loadConfig()
		this.state.library = Config.all.library
	}

	componentDidMount () {
		// ipcRenderer.send('get-albums', this.state.library.folders)
		ipcRenderer.on('albums', (event, albums) => {
			this.addAlbums(albums)
		})
	}

	addFolders = (folders) => {
		const library = Config.addFoldersToLibrary(folders)
		this.setState({ library })
		ipcRenderer.send('get-albums', this.state.library.folders)
	}

	addAlbums = (albums) => {
		const library = Config.addAlbumsToLibrary(albums)
		this.setState({ library })
	}

	updateLibrary = () => {
		console.log('updating')
	}

	render () {
		const { children } = this.props
		return (
			<LibraryContext.Provider
				value={{
					...this.state,
					addFolders: this.addFolders,
					updateLibrary: this.updateLibrary,
					addAlbums: this.addAlbums
				}}
			>
				{ children }
			</LibraryContext.Provider>
		)
	}
}
