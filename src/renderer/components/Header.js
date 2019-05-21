import React from 'react'
import '../scss/header.scss'
import { SongContext } from '../context/Song'
import Slider from 'rc-slider/lib/Slider'
import 'rc-slider/assets/index.css'
import Volume from './Volume'

class Header extends React.Component {
	constructor (props) {
		super(props)
		this.state = {
			sliderPos: 0,
			sliderMax: 10000,
			sliding: false
		}
	}

	componentDidMount () {
		this.context.setCurrentSong('SultansOfSwing.flac')
		this.context.subscribeEvent('onPlaying', this.updateSeekBar.bind(this))
		this.context.subscribeEvent('onEnded', this.onEnded.bind(this))
	}

	updateSeekBar = (currentPosition) => {
		const sliderPos = ( currentPosition / this.context.player.duration ) * this.state.sliderMax
		if (! this.state.sliding) {
			this.setState({
				sliderPos,
			})
		}
	}

	onEnded = () => {
		const sliderPos = 0
		this.setState({
			sliderPos,
		})
	}

	playPauseSong = () => {
		this.context.playPauseSong()
	}

	onSliderChange = (sliderPos) => {
		this.state.sliding = true
		this.setState({
			sliderPos,
		})
	}

	onSliderUpdate = (sliderPos) => {
		this.state.sliding = false
		this.setState({
			sliderPos,
		})
		const seekPos = (sliderPos / this.state.sliderMax) * this.context.player.duration
		this.context.player.seek(seekPos)
	}

	render () {
		return (
			<SongContext.Consumer>
				{ () => (
					<header>
						<h1 className="titlebar center">Musicion</h1>
						<div id="control-panel" className="control-panel">
							<div className="player-controls">
								<div className="album-art" />
								<div className="controls center">
									<div className="prev">
										<i className="icofont-ui-previous" />
									</div>
									<div className="play" onClick={this.playPauseSong}>
										{this.context.currentState === 'playing' ? (
											<i className="icofont-ui-pause" />
										) : (
											<i className="icofont-ui-play" />
										)}
									</div>
									<div className="next">
										<i className="icofont-ui-next" />
									</div>
								</div>
							</div>
							<div className="status-bar">
								<div className="sound-title">
									Current Song : { this.context.currentSong } || Song Status : { this.context.currentState }
								</div>
								<div className="seekbar">
									<Slider
										value={ this.state.sliderPos }
										max={ this.state.sliderMax }
										onChange={ this.onSliderChange }
										onAfterChange={ this.onSliderUpdate }
									/>
								</div>
							</div>
							<Volume />
						</div>
					</header>
				)}
			</SongContext.Consumer>
		)
	}
}

Header.contextType = SongContext

export default Header
