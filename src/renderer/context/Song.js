import React from 'react'
import Player from '../services/Player'
import { getSongName } from '../services/Helpers'

const DEFAULT_STATE = {
	currentSong: '',
	currentState: 'stopped',
	player: null,
	currentTags: {
		title: ''
	}
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

	setCurrentTags = file => {
		file.tags.title = getSongName(file)
		this.setState({ currentTags: file.tags })
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

	playPauseSong = (file)  => {
		let currentState
		if (file === undefined || file.file === this.state.currentSong) {
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
			this.state.player.loadSong(file.file, this.onStarted, this.onPlaying, this.onEnded)
			this.setState({ currentState, currentSong: file.file })
			this.setCurrentTags(file)
		}
	}

	stopSong = ()  => {
		this.setState({
			currentState: 'stopped'
		})
	}

	changeVolume = (vol) => {
		this.state.player.volume(vol)
		// Todo: Set Context Volume if required
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
					subscribeEvent: this.subscribeEvent,
					changeVolume: this.changeVolume
				}}
			>
				{ children }
			</SongContext.Provider>
		)
	}
}
