import React from 'react'
import { remote } from 'electron'
import PropTypes from 'prop-types'
import NoErrorImage from '../../shared/NoErrorImage'
import { PlayerContext } from '../../../context/PlayerContext'
import { PlaylistContext } from '../../../context/PlaylistContext'
import { getSongName } from '../../../services/Helpers'

import './AlbumDetails.scss'

function AlbumDetails (props) {
	const playSong = (contextPlaylist, contextPlayer, file) => {
		contextPlaylist.playSong(contextPlayer, file)
	}

	const addSongToPlaylist = (contextPlaylist, file, playlist) => {
		const playlistName = (playlist === undefined) ? contextPlaylist.currentPlaylist : playlist
		contextPlaylist.addSong(playlistName, file)
	}

	const showContextMenu = (contextPlaylist, file) => {
		const playlistsMenu = []
		contextPlaylist.playlists.forEach((playlist) => {
			playlistsMenu.push({
				label: playlist.name,
				click () { addSongToPlaylist(contextPlaylist, file, playlist.name) }
			})
		})

		const { Menu, MenuItem } = remote
		const template = new MenuItem({
			label: 'Add to Playlist',
			submenu: playlistsMenu
		})
		const contextMenu = new Menu()
		contextMenu.append(template)
		contextMenu.popup()
	}

	const { album, toggleInfoPanel } = props

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
										{album.files.map(file => (
											<li
												className="song"
												onClick={() => toggleInfoPanel(file)}
												onContextMenu={() => showContextMenu(contextPlaylist, file)}
												key={file.file}
											>
												{contextPlayer.currentState === 'playing' && contextPlayer.currentSong === file.file ? (
													<i
														className="play icofont-ui-pause"
														onClick={(e) => { contextPlayer.playPauseSong(file); e.stopPropagation() }}
													/>
												) : (
													<i
														className="play icofont-ui-play"
														onClick={(e) => { playSong(contextPlaylist, contextPlayer, file); e.stopPropagation() }}
													/>
												)}
												<span className="song-title">{ getSongName(file) }</span>
												<div
													className="menu-action"
													onClick={(e) => { showContextMenu(contextPlaylist, file); e.stopPropagation() }}
												>
													<span className="icon">&#8942;</span>
												</div>
												<div
													className="add-to-playlist"
													onClick={(e) => { addSongToPlaylist(contextPlaylist, file); e.stopPropagation() }}
												>
													<span className="icon">+</span>
													<span className="tooltip">{ `Add to: ${contextPlaylist.currentPlaylist}` }</span>
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

AlbumDetails.propTypes = {
	album: PropTypes.shape(
		{
			album: PropTypes.string,
			files: PropTypes.array
		}
	).isRequired,
	toggleInfoPanel: PropTypes.func.isRequired
}

export default AlbumDetails
