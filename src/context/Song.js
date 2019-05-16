import React from 'react'

const DEFAULT_STATE = {
	currentSong: '',
	currentSongState: 'stopped'
}

export const SongContext = React.createContext(DEFAULT_STATE)

export default class SongContextProvider extends React.Component {
	state = DEFAULT_STATE

	render () {
		const { children } = this.props
		return (
			<SongContext.Provider
				value={{
					...this.state
				}}
			>
				{ children }
			</SongContext.Provider>
		)
	}
}
