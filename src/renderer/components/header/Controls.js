import React from 'react'
import { PlaylistContext } from '../../context/PlaylistContext'
import { PlayerContext } from '../../context/PlayerContext'
import NoErrorImage from '../shared/NoErrorImage'

function Controls () {
	return (
		<PlaylistContext.Consumer>
			{contextPlaylist => (
				<PlayerContext.Consumer>
					{contextPlayer => (
						<div className="item player-controls">
							<div className="controls-wrapper">
								<ul className="controls center">
									<li className="control-item prev" onClick={() => contextPlaylist.playPrevious(contextPlayer)}>
										<button type="button" className="control-button">
											<i className="icofont-ui-previous" />
										</button>
									</li>
									<li className="control-item play" onClick={() => contextPlayer.playPauseSong()}>
										<button type="button" className="control-button">
											{contextPlayer.currentState === 'playing' ? (
												<i className="icofont-ui-pause" />
											) : (
												<i className="icofont-ui-play" />
											)}
										</button>
									</li>
									<li className="control-item next" onClick={() => contextPlaylist.playNext(contextPlayer)}>
										<button type="button" className="control-button">
											<i className="icofont-ui-next" />
										</button>
									</li>
								</ul>
								<div className="album-art">
									<div className="album-wrapper">
										<NoErrorImage image={contextPlayer.currentTags.imagePath} alt={contextPlayer.currentTags.title} />
									</div>
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
