import React from 'react'
import { PlaylistContext } from '../../context/PlaylistContext'
import { PlayerContext } from '../../context/PlayerContext'
import NoErrorImage from '../library/NoErrorImage'

function Controls () {
	return (
		<PlaylistContext.Consumer>
			{contextPlaylist => (
				<PlayerContext.Consumer>
					{contextPlayer => (
						<div className="player-controls">
							<div className="album-art">
								<NoErrorImage image={contextPlayer.currentTags.imagePath} alt={contextPlayer.currentTags.title} />
							</div>
							<div className="controls center">
								<div className="prev" onClick={() => contextPlaylist.playPrevious(contextPlayer)}>
									<i className="icofont-ui-previous" />
								</div>
								<div className="play" onClick={() => contextPlayer.playPauseSong()}>
									{contextPlayer.currentState === 'playing' ? (
										<i className="icofont-ui-pause" />
									) : (
										<i className="icofont-ui-play" />
									)}
								</div>
								<div className="next" onClick={() => contextPlaylist.playNext(contextPlayer)}>
									<i className="icofont-ui-next" />
								</div>
							</div>
						</div>
					)}
				</PlayerContext.Consumer>
			)}
		</PlaylistContext.Consumer>
	)
}

export default Controls
