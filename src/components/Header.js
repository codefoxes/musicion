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
			value: 0,
			max: 10000
		}
		this.player = new Player()
	}

	componentDidMount () {
		this.context.setCurrentSong('SultansOfSwing.flac')
	}

	playPauseSong = () => {
		this.context.playPauseSong()

		if (this.context.currentState === 'stopped') {
			this.player.play(this.context.currentSong)
		} else if (this.context.currentState === 'playing') {
			this.player.pause()
		} else if (this.context.currentState === 'paused') {
			this.player.resume()
		}
	}

	onSliderChange = (value) => {
		this.setState({
			value,
		});
	};

	render () {
		return (
			<SongContext.Consumer>
				{ () => (
					<header>
						<h1 className="titlebar center">Musicion</h1>
						<div id="control-panel" className="grid cols-2 control-panel">
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
							<div className="seekbar">
								<div className="sound-title">
									Current Song : { this.context.currentSong } <br />
									Song Status : { this.context.currentState }
								</div>
								<div className="seekbar" />
								<Slider
									value={ this.state.value }
									onChange={ this.onSliderChange }
									max={ this.state.max }
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
