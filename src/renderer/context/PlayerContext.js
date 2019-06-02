import React from 'react'
import Player from '../services/Player'
import { getSongName } from '../services/Helpers'

const DEFAULT_STATE = {
	currentSong: '',
	currentState: 'stopped',
	player: null,
	currentTags: {
		title: ''
	},
	volume: 0.8
}

export const PlayerContext = React.createContext(DEFAULT_STATE)

export default class PlayerContextProvider extends React.Component {
	constructor (props) {
		super(props)
		this.state = DEFAULT_STATE
		this.eventSubscribers = {
			onStarted: [],
			onPlaying: [],
			onEnded: [],
			onSpectrum: []
		}
	}

	componentDidMount () {
		this.setState({
			player: new Player()
		})
	}

	setCurrentSong = (currentSong) => {
		this.setState({ currentSong })
	}

	setCurrentTags = (file) => {
		const newFile = file
		newFile.tags.title = getSongName(file)
		this.setState({ currentTags: newFile.tags })
	}

	subscribeEvent = (event, subscriber) => {
		if (event in this.eventSubscribers) {
			this.eventSubscribers[event].push(subscriber)
		}
	}

	onStarted = () => {
		this.eventSubscribers.onStarted.forEach(async (subscriber) => {
			await subscriber()
		})
	}

	onPlaying = (currentPosition) => {
		this.eventSubscribers.onPlaying.forEach(async (subscriber) => {
			await subscriber(currentPosition)
		})
	}

	onEnded = () => {
		this.stopSong()

		this.eventSubscribers.onEnded.forEach(async (subscriber) => {
			await subscriber()
		})
	}

	onSpectrum = (spectrum) => {
		this.eventSubscribers.onSpectrum.forEach(async (subscriber) => {
			await subscriber(spectrum)
		})
	}

	playPauseSong = (file) => {
		let currentState
		if (file === undefined || file.file === this.state.currentSong) {
			if (this.state.currentState === 'playing') {
				currentState = 'paused'
				this.state.player.pause()
			} else {
				currentState = 'playing'
				const playing = this.state.player.play()
				if (playing === false) currentState = 'stopped'
			}
			this.setState({ currentState })
		} else {
			currentState = 'playing'
			const params = {
				onStarted: this.onStarted,
				onPlaying: this.onPlaying,
				onEnded: this.onEnded,
				onSpectrum: this.onSpectrum,
				volume: this.state.volume
			}
			this.state.player.loadSong(file.file, params)
			this.setState({ currentState, currentSong: file.file })
			this.setCurrentTags(file)
		}
	}

	stopSong = () => {
		this.setState({
			currentState: 'stopped'
		})
	}

	changeVolume = (vol) => {
		if (this.state.player !== null) this.state.player.volume(vol)
		this.setState({ volume: vol })
	}

	render () {
		const { children } = this.props
		return (
			<PlayerContext.Provider
				value={{
					...this.state,
					setCurrentSong: this.setCurrentSong,
					playPauseSong: this.playPauseSong,
					stopSong: this.stopSong,
					subscribeEvent: this.subscribeEvent,
					changeVolume: this.changeVolume
				}}
			>
				{ children }
			</PlayerContext.Provider>
		)
	}
}
