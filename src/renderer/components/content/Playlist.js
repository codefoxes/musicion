import React from 'react'
import { PlaylistContext } from '../../context/PlaylistContext'
import { getSongName } from '../../services/Helpers'

class Playlist extends React.Component {
	constructor (props) {
		super(props)
		this.state = {
			songs: {
				files: []
			}
		}
	}

	componentDidMount () {
		const songs = this.context.getSongs(this.props.playlist)
		this.setState({ songs })
	}

	componentDidUpdate(oldProps) {
		const newProps = this.props
		if (oldProps.playlist !== newProps.playlist) {
			const songs = this.context.getSongs(this.props.playlist)
			this.setState({ songs })
		}
	}

	render () {
		return (
			<PlaylistContext.Consumer>
				{() => {
					return (
						<div>
							<div>PlayList Name: { this.props.playlist }</div>
							{this.state.songs.files.map((song, i) => {
								return (
									<li className="song" key={i}>
										{ getSongName(song) }
									</li>
								)
							})}
						</div>
					)
				}}
			</PlaylistContext.Consumer>
		)
	}
}

Playlist.contextType = PlaylistContext

export default Playlist
