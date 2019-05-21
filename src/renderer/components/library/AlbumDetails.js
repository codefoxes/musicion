import React from 'react'
import { SongContext } from '../../context/Song'

const defaultImage = require('../default.svg')

class AlbumDetails extends React.Component {
	constructor (props) {
		super(props)
	}

	getMusicFileName = (filePath) => {
		const splits = filePath.split('/')
		return splits[splits.length - 1].split('.')[0]
	}

	playSong = (context, song) => {
		context.playPauseSong(song)
	}

	static addDefaultSrc (e) {
		e.target.src = defaultImage
	}

	render () {
		const { album } = this.props
		return (
			<SongContext.Consumer>
				{context => {
					return (
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
												{context.currentState === 'playing' && context.currentSong === file.file ? (
													<i className="play icofont-ui-pause" onClick={() => this.playSong(context, file.file)} />
												) : (
													<i className="play icofont-ui-play" onClick={() => this.playSong(context, file.file)} />
												)}
												<span className="song-title">{ this.getMusicFileName(file.file) }</span>
											</li>
										)
									})}
								</ul>
							</div>
						</div>
					</section>
				)}}
			</SongContext.Consumer>
		)
	}
}

export default AlbumDetails
