import React from 'react'
import AlbumDetails from './AlbumDetails'
import NoErrorImage from './NoErrorImage'
import { LibraryContext } from '../../context/Library'
import '../../scss/library.scss'

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
												<NoErrorImage image={album.files[0].tags.imagePath} alt={album.album} />
											</section>
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
