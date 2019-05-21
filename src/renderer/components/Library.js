import React from 'react'
import { LibraryContext } from '../context/Library'
import '../scss/library.scss'

const defaultImage = require('./default.svg')

class Library extends React.Component {
	constructor (props) {
		super(props)
		this.state = {
			expanded: {}
		}
	}

	expandAlbum = (album) => {
		const { expanded } = this.state
		Object.keys( expanded ).forEach(a => { if (a !== album) expanded[a] = false })
		expanded[album] = !((album in expanded) && expanded[album])
		this.setState( { expanded } )
	}

	getMusicFileName = (filePath) => {
		const splits = filePath.split('/')
		return splits[splits.length - 1].split('.')[0]
	}

	addDefaultSrc (e){
		e.target.src = defaultImage
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
											<section className="album-thumbnail" onClick={() => this.expandAlbum(album.album)}>
												<img src={`file:///${album.files[0].tags.imagePath}`} alt={album.album} onError={this.addDefaultSrc} />
											</section>
											<section className="album-details">
												<div className="album-details-inner">
													<div className="cover">
														<img src={`file:///${album.files[0].tags.imagePath}`} alt={album.album} onError={this.addDefaultSrc} />
													</div>
													<div className="album-content">
														<ul className="songs-list">
															{album.files.map((file, j) => {
																return (
																	<li className="song" key={j}>
																		<i className="play icofont-ui-play" />
																		<span className="song-title">{ this.getMusicFileName(file.file) }</span>
																	</li>
																)
															})}
														</ul>
													</div>
												</div>
											</section>
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
