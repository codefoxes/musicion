import React from 'react'
import { LibraryContext } from '../context/Library'
import '../scss/library.scss'

class Library extends React.Component {
	constructor (props) {
		super(props)
		this.state = {
		}
	}

	render () {
		return (
			<LibraryContext.Consumer>
				{ () => (
					<div className="library">
						{this.context.library && this.context.library.albums ? (
							<ul className="albums">
								{this.context.library.albums.map((album, i) => {
									return (
										<li key={i} className="album">
											<img src={`file:///${album.files[0].tags.imagePath}`} alt={album.album} />
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
