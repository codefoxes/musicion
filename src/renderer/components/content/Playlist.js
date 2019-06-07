import React from 'react'
import ReactTable from 'react-table'
import PropTypes from 'prop-types'
import PlayButton from './PlayButton'
import { PlaylistContext } from '../../context/PlaylistContext'

import 'react-table/react-table.css'
import './Playlist.scss'

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

	componentDidUpdate (oldProps) {
		const newProps = this.props
		if (oldProps.playlist !== newProps.playlist) {
			const songs = this.context.getSongs(this.props.playlist)
			this.setState({ songs })
		}
	}

	render () {
		const RemoveSong = ({ index }) => (
			<div
				className="remove-button"
				onClick={() => this.context.removeSong(this.props.playlist, index)}
			>
				{ 'x' }
			</div>
		)

		const columns = [{
			id: 'control',
			Header: '',
			accessor: '',
			Cell: props => <PlayButton data={props} />,
			width: 30
		}, {
			id: 'title',
			Header: 'Name',
			accessor: d => d.tags.title
		}, {
			id: 'album',
			Header: 'Album',
			accessor: d => d.tags.album
		}, {
			id: 'composer',
			Header: 'Composer',
			accessor: d => d.tags.composer
		}, {
			id: 'genre',
			Header: 'Genre',
			accessor: d => d.tags.genre
		}, {
			id: 'performer',
			Header: 'Performer',
			accessor: d => d.tags.performerInfo
		}, {
			id: 'year',
			Header: 'Year',
			accessor: d => d.tags.year
		}, {
			id: 'remove',
			Header: '',
			accessor: '',
			Cell: props => <RemoveSong index={props.index} />,
			width: 35
		}]

		return (
			<PlaylistContext.Consumer>
				{() => (
					<div className="playlist">
						<ReactTable
							data={this.state.songs.files}
							columns={columns}
						/>
					</div>
				)}
			</PlaylistContext.Consumer>
		)
	}
}

Playlist.contextType = PlaylistContext

Playlist.propTypes = {
	playlist: PropTypes.string.isRequired
}

export default Playlist
