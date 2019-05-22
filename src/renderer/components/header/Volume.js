import React from 'react'
import { SongContext } from '../../context/Song'
import Slider from 'rc-slider/lib/Slider'

class Volume extends React.Component {
	constructor (props) {
		super(props)
		this.state = {
			volumePos: 0,
			volumeMax: 100
		}
		this.getVolumePos()
	}

	getVolumePos = () => {
		let defaultVolume = parseInt(localStorage.getItem('volume'), 10)
		if (Number.isNaN(defaultVolume)) {
			defaultVolume = 50
		}
		this.state.volumePos = defaultVolume
	}

	onVolumeChange = (volumePos) => {
		this.setState({
			volumePos,
		})

		// TODO: DEBOUNCE
		this.context.changeVolume(volumePos / 100)
	}

	onVolumeUpdate = (volumePos) => {
		localStorage.setItem('volume', volumePos)
	}

	render () {
		return (
			<SongContext.Consumer>
				{ () => (
					<div className="volume-bar">
						<Slider
							value={ this.state.volumePos }
							max={ this.state.volumeMax }
							onChange={ this.onVolumeChange }
							onAfterChange={ this.onVolumeUpdate }
						/>
					</div>
				)}
			</SongContext.Consumer>
		)
	}
}

Volume.contextType = SongContext

export default Volume
