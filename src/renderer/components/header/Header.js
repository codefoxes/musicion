import React from 'react'
import Slider from 'rc-slider/lib/Slider'
import Volume from './Volume'
import Visualizer from './Visializer'
import Controls from './Controls'
import { PlayerContext } from '../../context/PlayerContext'

import './header.scss'
import 'rc-slider/assets/index.css'

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
		// this.context.setCurrentSong('')
		this.context.subscribeEvent('onPlaying', this.updateSeekBar.bind(this))
		this.context.subscribeEvent('onEnded', this.onEnded.bind(this))
	}

	updateSeekBar = (currentPosition) => {
		const sliderPos = (currentPosition / this.context.player.duration) * this.state.sliderMax
		if (!this.state.sliding) {
			this.setState({
				sliderPos
			})
		}
	}

	onEnded = () => {
		const sliderPos = 0
		this.setState({
			sliderPos
		})
	}

	playPauseSong = () => {
		this.context.playPauseSong()
	}

	onSliderChange = (sliderPos) => {
		this.state.sliding = true
		this.setState({
			sliderPos
		})
	}

	onSliderUpdate = (sliderPos) => {
		this.state.sliding = false
		this.setState({
			sliderPos
		})
		const seekPos = (sliderPos / this.state.sliderMax) * this.context.player.duration
		this.context.player.seek(seekPos)
	}

	getRunningTitle = () => {
		let { title } = this.context.currentTags
		if ('artist' in this.context.currentTags) {
			title += ` by ${this.context.currentTags.artist}`
		}
		return title
	}

	timeDetails = () => {
		const time = {
			current: '',
			duration: ''
		}
		if (this.context.player !== null && 'duration' in this.context.player && this.context.player.duration !== 0) {
			const totalMinutes = Math.floor(this.context.player.duration / 60)
			const totalSeconds = Math.round(this.context.player.duration % 60)

			const currentTime = (this.state.sliderPos / this.state.sliderMax) * this.context.player.duration

			const currentMinutes = Math.floor(currentTime / 60)
			const currentSeconds = Math.round(currentTime % 60)
			time.duration = `${totalMinutes}:${totalSeconds}`
			time.current = `${currentMinutes}:${currentSeconds}`
		}
		return (
			<div className="time">
				<div className="current">{ time.current }</div>
				<div className="duration">{ time.duration }</div>
			</div>
		)
	}

	render () {
		return (
			<PlayerContext.Consumer>
				{ () => (
					<header>
						<div id="control-panel" className="control-panel">
							<Visualizer />
							<div className="item control-home" />
							<Controls />
							<div className="status-bar">
								<div className="sound-details">
									<div className="sound-title">
										{ this.getRunningTitle() }
									</div>
									<this.timeDetails />
								</div>
								<div className="seekbar">
									<Slider
										value={this.state.sliderPos}
										max={this.state.sliderMax}
										onChange={this.onSliderChange}
										onAfterChange={this.onSliderUpdate}
									/>
								</div>
							</div>
							<Volume />
						</div>
					</header>
				)}
			</PlayerContext.Consumer>
		)
	}
}

Header.contextType = PlayerContext

export default Header
