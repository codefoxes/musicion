import React, { Fragment } from 'react'
import BackendService from 'backend'
import PropTypes from 'prop-types'
import { LibraryContext } from '../../context/LibraryContext'
import { PlaylistContext } from '../../context/PlaylistContext'
import './mainmenu.scss'

class MainMenu extends React.Component {
	constructor (props) {
		super(props)
		this.state = {
			activeMenu: 'albums',
			activeAction: '',
			showAddPlaylist: false
		}
	}

	componentDidUpdate (prevProps, prevState, snapshot) {
		if (!prevState.showAddPlaylist && this.state.showAddPlaylist && this.playlistInput) {
			this.playlistInput.focus()
		}
	}

	addFolders = (folders) => {
		this.context.addFolders(folders)
	}

	selectFolder = () => {
		BackendService.selectFolder(this.addFolders)
	}

	changeMenu = (menu, sub) => {
		let activeMenu = menu
		if (sub !== undefined) {
			activeMenu = sub
		}
		this.setState({ activeMenu })
		this.props.changeMenu(menu, sub)
	}

	activeClass = (menu) => {
		let classes = ''
		classes += this.state.activeMenu === menu ? 'active' : ''
		classes += this.state.activeAction === menu ? ' active-action' : ''
		return classes
	}

	addNewPlaylist = (e, contextPlaylist) => {
		if (e.key === 'Enter') {
			contextPlaylist.addPlaylist(e.target.value)
		}

		if (e.key === 'Escape') {
			this.setState({ showAddPlaylist: false })
		}
	}

	showActionFromRightClick = (e, menu, sub) => {
		// console.log(e.clientX, e.clientY)
	}

	showAction = (menu) => {
		let activeAction = menu
		if (this.state.activeAction === menu) {
			activeAction = ''
		}
		this.setState({ activeAction })
	}

	removePlaylist = (contextPlaylist, playlist) => {
		// Todo: Add prompt
		contextPlaylist.removePlaylist(playlist)
	}

	render () {
		return (
			<LibraryContext.Consumer>
				{ () => (
					<div className="main-menu" id="main-menu">
						<ul>
							<li>
								<div className="title">
									<span>Library</span>
									<div className="title-action" onClick={this.selectFolder}>
										<span className="icon">+</span>
										<span className="tooltip">Add Folder</span>
									</div>
								</div>
								<ul className="child">
									<li
										className={this.activeClass('albums')}
										onClick={() => this.changeMenu('albums')}
									>
										{ 'Albums' }
									</li>
								</ul>
							</li>
							<li>
								<PlaylistContext.Consumer>
									{contextPlaylist => (
										<Fragment>
											<div className="title">
												<span>Playlists</span>
												<div
													className="title-action"
													onClick={() => this.setState(prev => ({ showAddPlaylist: !prev.showAddPlaylist }))}
												>
													<span className="icon">+</span>
													<span className="tooltip">Create New</span>
												</div>
											</div>
											<ul className="child">
												{this.state.showAddPlaylist && (
													<li className="add-playlist">
														<input
															type="text"
															onKeyDown={e => this.addNewPlaylist(e, contextPlaylist)}
															ref={(ip) => { this.playlistInput = ip }}
														/>
													</li>
												)}
												{contextPlaylist.playlists.map(playlist => (
													<li
														key={playlist.name}
														className={this.activeClass(playlist.name)}
														onContextMenu={e => this.showActionFromRightClick(e, 'playlist', playlist.name)}
														onClick={() => this.changeMenu('playlist', playlist.name)}
													>
														<span>{ playlist.name }</span>
														<div className="menu-action">
															<span
																className="icon"
																onClick={() => this.showAction(playlist.name)}
															>
																<span>&#8942;</span>
															</span>
															<div className="dropdown">
																<ul>
																	<li
																		onClick={() => this.removePlaylist(contextPlaylist, playlist.name)}
																	>
																		{ 'Remove Playlist' }
																	</li>
																</ul>
															</div>
														</div>
													</li>
												))}
											</ul>
										</Fragment>
									)}
								</PlaylistContext.Consumer>
							</li>
						</ul>
						<div className="ad-area">
							<div className="ad-placeholder">Advertisements</div>
						</div>
					</div>
				)}
			</LibraryContext.Consumer>
		)
	}
}

MainMenu.contextType = LibraryContext

MainMenu.propTypes = {
	changeMenu: PropTypes.func.isRequired
}

export default MainMenu
