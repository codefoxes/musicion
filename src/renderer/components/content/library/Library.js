import React from 'react'
import { remote } from 'electron'
import AlbumDetails from './AlbumDetails'
import NoErrorImage from '../../shared/NoErrorImage'
import { LibraryContext } from '../../../context/LibraryContext'
import { PlaylistContext } from '../../../context/PlaylistContext'
import './library.scss'

class Library extends React.Component {
	constructor (props) {
		super(props)
		this.state = {
			expanded: {}
		}
	}

	expandAlbum = (album) => {
		const { expanded } = this.state
		Object.keys(expanded).forEach((a) => { if (a !== album) expanded[a] = false })
		expanded[album] = !((album in expanded) && expanded[album])
		this.setState({ expanded })
	}

	addAlbumToPlaylist = (contextPlaylist, album, playlist) => {
		contextPlaylist.addSong(playlist, album.files)
	}

	showAlbumContextMenu = (contextPlaylist, album) => {
		const playlistsMenu = []
		contextPlaylist.playlists.forEach((playlist) => {
			playlistsMenu.push({
				label: playlist.name,
				click: () => { this.addAlbumToPlaylist(contextPlaylist, album, playlist.name) }
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

	render () {
		return (
			<LibraryContext.Consumer>
				{ () => (
					<div className="library">
						{this.context.library && this.context.library.albums ? (
							<ul className="albums-grid">
								{this.context.library.albums.map((album, i) => {
									const { expanded } = this.state
									const expandedClass = (album.album in expanded) && expanded[album.album] ? 'expanded' : ''
									return (
										<li key={i} className={`album ${expandedClass}`}>
											<PlaylistContext.Consumer>
												{contextPlaylist => (
													<section
														className="album-thumbnail"
														onClick={() => this.expandAlbum(album.album)}
														onContextMenu={() => this.showAlbumContextMenu(contextPlaylist, album)}
													>
														<NoErrorImage image={album.files[0].tags.imagePath} alt={album.album} />
													</section>
												)}
											</PlaylistContext.Consumer>
											<AlbumDetails album={album} />
										</li>
									)
								})}
							</ul>
						) : (
							<div>No Albums Yet</div>
						)}
					</div>
				)}
			</LibraryContext.Consumer>
		)
	}
}

Library.contextType = LibraryContext

export default Library
