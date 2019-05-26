import React from 'react'
import NoErrorImage from './NoErrorImage'
import { PlayerContext } from '../../context/PlayerContext'
import { PlaylistContext } from '../../context/PlaylistContext'
import { getSongName } from '../../services/Helpers'

import './AlbumDetails.scss'

class AlbumDetails extends React.Component {
	playSong = (contextPlaylist, contextPlayer, file) => {
		contextPlaylist.playSong(contextPlayer, file)
	}

	addSongToCurrentPlaylist = (contextPlaylist, file) => {
		contextPlaylist.addSong(contextPlaylist.currentPlaylist, file)
	}

	render () {
		const { album } = this.props
		return (
			<PlaylistContext.Consumer>
				{contextPlaylist => (
					<PlayerContext.Consumer>
						{contextPlayer => (
							<section className="album-details">
								<div className="album-details-inner">
									<div className="cover">
										<NoErrorImage image={album.files[0].tags.imagePath} alt={album.album} />
									</div>
									<div className="album-content">
										<ul className="songs-list">
											{album.files.map((file, j) => (
												<li className="song" key={j}>
													{contextPlayer.currentState === 'playing' && contextPlayer.currentSong === file.file ? (
														<i
															className="play icofont-ui-pause"
															onClick={() => contextPlayer.playPauseSong(file)}
														/>
													) : (
														<i
															className="play icofont-ui-play"
															onClick={() => this.playSong(contextPlaylist, contextPlayer, file)}
														/>
													)}
													<span className="song-title">{ getSongName(file) }</span>
													<div
														className="add-to-playlist"
														onClick={() => this.addSongToCurrentPlaylist(contextPlaylist, file)}
													>
														<span className="icon">+</span>
														<span className="tooltip">Add to Playlist: {contextPlaylist.currentPlaylist}</span>
													</div>
												</li>
											))}
										</ul>
									</div>
								</div>
							</section>
						)}
					</PlayerContext.Consumer>
				)}
			</PlaylistContext.Consumer>
		)
	}
}

export default AlbumDetails
