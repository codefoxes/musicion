/* eslint react/no-unused-state: 0 */
/* Bug with eslint */
import React from 'react'
import Slider from 'rc-slider/lib/Slider'
import { PlayerContext } from '../../context/PlayerContext'
import { SettingsContext } from '../../context/SettingsContext'

class Volume extends React.Component {
	constructor (props) {
		super(props)
		this.state = {
			volumePos: 0,
			volumeMax: 100,
			showVolume: false,
			volumeChanging: false
		}
	}

	componentDidMount () {
		this.getVolumePos()
	}

	getVolumePos = () => {
		let defaultVolume = parseInt(localStorage.getItem('volume'), 10)
		if (Number.isNaN(defaultVolume)) {
			defaultVolume = 50
		}
		this.state.volumePos = defaultVolume
		this.context.changeVolume(defaultVolume / 100)
	}

	onVolumeChange = (volumePos) => {
		this.setState({
			volumePos,
			volumeChanging: true
		})

		// TODO: DEBOUNCE
		this.context.changeVolume(volumePos / 100)
	}

	onVolumeUpdate = (volumePos) => {
		localStorage.setItem('volume', volumePos)
		this.setState({
			volumeChanging: false,
			showVolume: false
		})
	}

	showVolume = () => this.setState({ showVolume: true })

	hideVolume = () => {
		this.setState((prev) => {
			if (!prev.volumeChanging) {
				return { showVolume: false }
			}
			return { showVolume: true }
		})
	}

	render () {
		return (
			<SettingsContext.Consumer>
				{ (contextSettings) => {
					let classes = `item volume-bar`
					const vertical = contextSettings.currentMedia === 'mobile'
					if (this.state.showVolume) classes = `${classes} show`
					return (
						<div className={classes}>
							<div className="volume-wrapper" onMouseOver={this.showVolume} onMouseOut={this.hideVolume}>
								<div className="speaker">
									<i className="icofont-ui-volume" />
								</div>
								<Slider
									value={this.state.volumePos}
									max={this.state.volumeMax}
									onChange={this.onVolumeChange}
									onAfterChange={this.onVolumeUpdate}
									vertical={vertical}
								/>
							</div>
						</div>
					)
				}}
			</SettingsContext.Consumer>
		)
	}
}

Volume.contextType = PlayerContext

export default Volume
