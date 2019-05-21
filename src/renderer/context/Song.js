import React from 'react'
import Player from '../services/Player'

const DEFAULT_STATE = {
	currentSong: '',
	currentState: 'stopped',
	player: null
}

export const SongContext = React.createContext(DEFAULT_STATE)

export default class SongContextProvider extends React.Component {

	constructor (props) {
		super(props)
		this.state = DEFAULT_STATE
		this.eventSubscribers = {
			'onStarted': [],
			'onPlaying': [],
			'onEnded': []
		}
	}

	componentDidMount () {
		this.setState({
			player: new Player()
		})
	}

	setCurrentSong = currentSong  => {
		this.setState({currentSong})
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

	playPauseSong = (song)  => {
		let currentState
		if (song === undefined || song === this.state.currentSong) {
			if (this.state.currentState === 'playing') {
				currentState = 'paused'
				this.state.player.pause()
			} else {
				currentState = 'playing'
				this.state.player.play()
			}
			this.setState({ currentState })
		} else {
			currentState = 'playing'
			this.state.player.loadSong(song, this.onStarted, this.onPlaying, this.onEnded)
			this.setState({ currentState, currentSong: song })
		}
	}

	stopSong = ()  => {
		this.setState({
			currentState: 'stopped'
		})
	}

	render () {
		const { children } = this.props
		return (
			<SongContext.Provider
				value={{
					...this.state,
					setCurrentSong: this.setCurrentSong,
					playPauseSong: this.playPauseSong,
					stopSong: this.stopSong,
					subscribeEvent: this.subscribeEvent
				}}
			>
				{ children }
			</SongContext.Provider>
		)
	}
}
