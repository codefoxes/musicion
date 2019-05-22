import React from 'react'
import NoErrorImage from './NoErrorImage'
import { SongContext } from '../../context/Song'
import { getSongName } from '../../services/Helpers'

class AlbumDetails extends React.Component {
	constructor (props) {
		super(props)
	}

	playSong = (context, file) => {
		context.playPauseSong(file)
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
								<NoErrorImage image={album.files[0].tags.imagePath} alt={album.album} />
							</div>
							<div className="album-content">
								<ul className="songs-list">
									{album.files.map((file, j) => {
										return (
											<li className="song" key={j}>
												{context.currentState === 'playing' && context.currentSong === file.file ? (
													<i className="play icofont-ui-pause" onClick={() => this.playSong(context, file)} />
												) : (
													<i className="play icofont-ui-play" onClick={() => this.playSong(context, file)} />
												)}
												<span className="song-title">{ getSongName(file) }</span>
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
