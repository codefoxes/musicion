import React from 'react'
import { LibraryContext } from '../context/Library'
import '../scss/library.scss'

class Library extends React.Component {
	constructor (props) {
		super(props)
		this.state = {
			expanded: {}
		}
	}

	expandAlbum = (album) => {
		const { expanded } = this.state
		expanded[album] = !((album in expanded) && expanded[album])
		this.setState( { expanded } )
	}

	getMusicFileName = (filePath) => {
		const splits = filePath.split('/')
		return splits[splits.length - 1].split('.')[0]
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
												<img src={`file:///${album.files[0].tags.imagePath}`} alt={album.album} />
											</section>
											<section className="album-details">
												<div className="album-details-inner">
													<div>
														<div className="cover">
															<img src={`file:///${album.files[0].tags.imagePath}`} alt={album.album} />
														</div>
														<div className="songs-list">
															<ul>
																{album.files.map((file, j) => {
																	return (
																		<li key={j}>{ this.getMusicFileName(file.file) }</li>
																	)
																})}
															</ul>
														</div>
													</div>
												</div>
											</section>
										</li>
									)
								})}
								<li className="album">
									<section className="album-thumbnail">
										<img src={`file:///test`} alt="Test" />
									</section>
									<section className="album-details">
										<div className="album-details-inner">
											Details
										</div>
									</section>
								</li>
								<li className="album">
									<section className="album-thumbnail">
										<img src={`file:///test`} alt="Test" />
									</section>
									<section className="album-details">
										<div className="album-details-inner">
										</div>
									</section>
								</li>
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
