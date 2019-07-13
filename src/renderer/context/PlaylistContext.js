import React from 'react'
import PropTypes from 'prop-types'
import Config from '../services/Config'

const DEFAULT_STATE = {
	currentPlaylist: 'Default',
	currentSongIndex: 0,
	playlists: []
}

export const PlaylistContext = React.createContext(DEFAULT_STATE)

export default class PlaylistContextProvider extends React.Component {
	constructor (props) {
		super(props)
		this.state = DEFAULT_STATE
		this.contextPlayer = null
		Config.loadPlaylists()
		this.state.playlists = Config.playlists

		// Todo: Better method to subscribe `onEnded` only once.
		this.endSubscribed = false
	}

	get currentSongs () {
		return this.state.playlists.find(elem => elem.name === this.state.currentPlaylist).files
	}

	addPlaylist = (playlistName) => {
		const plPromise = Config.addFilesToPlaylist(playlistName)
		// Todo: Why to setState, remove works without setState
		plPromise.then(() => {
			this.setState({ playlists: Config.playlists })
		})
	}

	removePlaylist = (playlistName) => {
		Config.removePlaylist(playlistName)
	}

	playSong = (contextPlayer, file, index = null, playlist = null) => {
		this.contextPlayer = contextPlayer
		let reload = false
		let { currentPlaylist } = this.state
		if (playlist !== null) {
			if (file.file === contextPlayer.currentSong && currentPlaylist !== playlist) reload = true
			currentPlaylist = playlist
		}
		let currentSongIndex = 0
		if (index !== null) {
			currentSongIndex = index
		} else {
			this.addSong(currentPlaylist, file)
			currentSongIndex = this.currentSongs.length - 1
		}
		this.setState({ currentSongIndex, currentPlaylist })
		contextPlayer.playPauseSong(file, reload)
		if (!this.endSubscribed) {
			contextPlayer.subscribeEvent('onEnded', this.onEnded.bind(this))
			this.endSubscribed = true
		}
	}

	playPrevious = (contextPlayer) => {
		// Todo: Check if index is out of range.
		this.setState((prevState) => {
			const newIndex = prevState.currentSongIndex - 1
			const prevSong = this.currentSongs[newIndex]
			contextPlayer.playPauseSong(prevSong)
			return { currentSongIndex: newIndex }
		})
	}

	playNext = (contextPlayer) => {
		// Todo: Check if index is out of range.
		this.setState((prevState) => {
			const newIndex = prevState.currentSongIndex + 1
			const prevSong = this.currentSongs[newIndex]
			contextPlayer.playPauseSong(prevSong)
			return { currentSongIndex: newIndex }
		})
	}

	onEnded = () => {
		const nextIndex = this.state.currentSongIndex + 1
		if (this.contextPlayer !== null && this.currentSongs.length > nextIndex) {
			this.playSong(this.contextPlayer, this.currentSongs[nextIndex], nextIndex)
		}
	}

	getSongs = playlistName => this.state.playlists.find(playlist => playlist.name === playlistName)

	addSong = (playlistName, file) => {
		Config.addFilesToPlaylist(playlistName, file)
	}

	removeSong = (playlistName, index) => {
		const plPromise = Config.removeFileFromPlaylist(playlistName, index)

		plPromise.then(() => {
			this.setState({ playlists: Config.playlists })
		})
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
					removePlaylist: this.removePlaylist,
					removeSong: this.removeSong,
					playPrevious: this.playPrevious,
					playNext: this.playNext
				}}
			>
				{ children }
			</PlaylistContext.Provider>
		)
	}
}

PlaylistContextProvider.propTypes = {
	children: PropTypes.node.isRequired
}
