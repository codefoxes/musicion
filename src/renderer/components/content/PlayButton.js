import React, { Fragment } from 'react'
import { PlaylistContext } from '../../context/PlaylistContext'
import { PlayerContext } from '../../context/PlayerContext'

function PlayButton (props) {
	const { data } = props
	const song = data.value
	let index = 0
	if ('index' in data) {
		index = data.index
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
											onClick={() => contextPlaylist.playSong(contextPlayer, song, index)}
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

export default PlayButton
