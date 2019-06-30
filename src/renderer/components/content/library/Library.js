import React, { Fragment } from 'react'
import BackendService from 'backend'
import AlbumDetails from './AlbumDetails'
import InfoPanel from './InfoPanel'
import NoErrorImage from '../../shared/NoErrorImage'
import { LibraryContext } from '../../../context/LibraryContext'
import { PlaylistContext } from '../../../context/PlaylistContext'
import './library.scss'

class Library extends React.Component {
	constructor (props) {
		super(props)
		this.state = {
			expanded: {},
			showInfo: false,
			infoFile: null
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
		const menuObject = {
			label: 'Add to Playlist',
			submenu: playlistsMenu
		}
		BackendService.showContextMenu(menuObject)
	}

	toggleInfoPanel = (file) => {
		this.setState(prev => ({ infoFile: file, showInfo: (file !== prev.infoFile) ? true : !prev.showInfo }))
	}

	handleInfoChange = (file) => {
		this.setState(prev => ({ infoFile: file }))
	}

	render () {
		return (
			<LibraryContext.Consumer>
				{ () => (
					<Fragment>
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
															<div className="image-wrap">
																<NoErrorImage image={album.files[0].tags.imagePath} alt={album.album} />
															</div>
															<div className="album-name">{ album.album }</div>
														</section>
													)}
												</PlaylistContext.Consumer>
												<AlbumDetails album={album} toggleInfoPanel={this.toggleInfoPanel} expandAlbum={this.expandAlbum} />
											</li>
										)
									})}
								</ul>
							) : (
								<div>No Albums Yet</div>
							)}
						</div>
						<InfoPanel
							show={this.state.showInfo}
							file={this.state.infoFile}
							toggleInfoPanel={this.toggleInfoPanel}
							handleInfoChange={this.handleInfoChange}
						/>
					</Fragment>
				)}
			</LibraryContext.Consumer>
		)
	}
}

Library.contextType = LibraryContext

export default Library
