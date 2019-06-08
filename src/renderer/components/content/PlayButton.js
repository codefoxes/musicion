import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import { PlaylistContext } from '../../context/PlaylistContext'
import { PlayerContext } from '../../context/PlayerContext'

function PlayButton (props) {
	const { data, playlist } = props
	const song = data.value
	let index = 0
	if ('index' in data) {
		({ index } = data)
	}

	return (
		<PlaylistContext.Consumer>
			{(contextPlaylist) => {
				if (!('index' in data)) {
					index = contextPlaylist.currentSongIndex
				}
				return (
					<PlayerContext.Consumer>
						{contextPlayer => (
							<Fragment>
								{(contextPlayer.currentState === 'playing' &&
									contextPlayer.currentSong === song.file &&
									index === contextPlaylist.currentSongIndex) ? (
										<i
											className="play icofont-ui-pause"
											onClick={() => contextPlayer.playPauseSong(song)}
										/>
									) : (
										<i
											className="play icofont-ui-play"
											onClick={() => contextPlaylist.playSong(contextPlayer, song, index, playlist)}
										/>
									)
								}
							</Fragment>
						)}
					</PlayerContext.Consumer>
				)
			}}
		</PlaylistContext.Consumer>
	)
}

PlayButton.propTypes = {
	data: PropTypes.shape({
		index: PropTypes.number
	}).isRequired,
	playlist: PropTypes.string
}

PlayButton.defaultProps = {
	playlist: undefined
}

export default PlayButton
