import React from 'react'

const DEFAULT_STATE = {
	currentSong: '',
	currentState: 'stopped'
}

export const SongContext = React.createContext(DEFAULT_STATE)

export default class SongContextProvider extends React.Component {

	constructor (props) {
		super(props)
		this.state = DEFAULT_STATE
	}

	setCurrentSong = currentSong  => {
		this.setState({currentSong})
	}

	playPauseSong = ()  => {
		this.setState({
			currentState: this.state.currentState === 'playing' ? 'paused' : 'playing'
		})
	}

	render () {
		const { children } = this.props
		return (
			<SongContext.Provider
				value={{
					...this.state,
					setCurrentSong: this.setCurrentSong,
					playPauseSong: this.playPauseSong
				}}
			>
				{ children }
			</SongContext.Provider>
		)
	}
}
