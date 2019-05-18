import React from 'react'
import '../scss/header.scss'
import { SongContext } from '../context/Song'
import Player from '../services/Player'
import Slider from 'rc-slider/lib/Slider'
import 'rc-slider/assets/index.css'

class Header extends React.Component {
	constructor (props) {
		super(props)
		this.state = {
			sliderPos: 0,
			sliderMax: 10000,
			sliding: false
		}
		this.player = new Player()
	}

	componentDidMount () {
		this.context.setCurrentSong('SultansOfSwing.flac')
	}

	updateSeekBar = (currentPosition) => {
		const sliderPos = ( currentPosition / this.player.duration ) * this.state.sliderMax
		if (! this.state.sliding) {
			this.setState({
				sliderPos,
			})
		}
	}

	onEnded = () => {
		this.context.stopSong()

		const sliderPos = 0
		this.setState({
			sliderPos,
		})
	}

	playPauseSong = () => {
		this.context.playPauseSong()

		if (this.context.currentState === 'stopped') {
			this.player.loadSong(this.context.currentSong, null, this.updateSeekBar, this.onEnded)
		} else if (this.context.currentState === 'playing') {
			this.player.pause()
		} else if (this.context.currentState === 'paused') {
			this.player.play()
		}
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
		const seekPos = (sliderPos / this.state.sliderMax) * this.player.duration
		this.player.seek(seekPos)
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
							<div className="volume-bar">
								<Slider
									value={ this.state.sliderPos }
									max={ this.state.sliderMax }
								/>
							</div>
						</div>
					</header>
				)}
			</SongContext.Consumer>
		)
	}
}

Header.contextType = SongContext

export default Header
