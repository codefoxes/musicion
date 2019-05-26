import React from 'react'
import Config from '../services/Config'

const DEFAULT_STATE = {
	currentPlaylist: 'Default',
	currentSongs: [],
	playlists: {}
}

export const PlaylistContext = React.createContext(DEFAULT_STATE)

export default class PlaylistContextProvider extends React.Component {
	constructor (props) {
		super(props)
		this.state = DEFAULT_STATE
		Config.loadPlaylists()
		this.state.playlists = Config.playlists
	}

	addPlaylist = (playlistName) => {
		const plPromise = Config.addFilesToPlaylist(playlistName)
		// Todo: Why to setState, remove works without setState
		plPromise.then(() => {
			this.setState({ playlists: Config.playlists })
		})
	}

	removePlaylist = (playlistName) => {
		const plPromise = Config.removePlaylist(playlistName)
	}

	playSong = (contextPlayer, file) => {
		const { currentSongs } = this.state
		currentSongs.push(file)
		this.setState({ currentSongs })
		contextPlayer.playPauseSong(file)
	}

	getSongs = (playlistName) => {
		return this.state.playlists.find(playlist => playlist.name === playlistName)
	}

	addSong = (playlist, file) => {
		Config.addFilesToPlaylist(playlist, file)
	}

	render () {
		const { children } = this.props
		return (
			<PlaylistContext.Provider
				value={{
					...this.state,
					playSong: this.playSong,
					getSongs: this.getSongs,
					addSong: this.addSong,
					addPlaylist: this.addPlaylist,
					removePlaylist: this.removePlaylist
				}}
			>
				{ children }
			</PlaylistContext.Provider>
		)
	}
}
