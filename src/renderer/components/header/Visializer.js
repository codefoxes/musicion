import React from 'react'
import { PlayerContext } from '../../context/PlayerContext'

import '../../scss/visualizer.scss'

class Visualizer extends React.Component {
	constructor (props) {
		super(props)
		this.state = {
			spectrum: []
		}
	}

	componentDidMount () {
		this.context.subscribeEvent('onSpectrum', this.onSpectrum.bind(this))
	}

	onSpectrum (spectrum) {
		this.setState({ spectrum })
	}

	render () {
		const reversed = this.state.spectrum.slice().filter((element, index) => {
			return (index % 3 === 0)
		}).reverse()
		const spectrum = reversed.concat(this.state.spectrum)
		return (
			<PlayerContext.Consumer>
				{ () => {
					return (
						<div className="player-spectrum">
							<div className="player-spectrum-bars">
								{spectrum.map((freq, j) => {
									// const amp = (j < 4) ? (freq - (freq * 0.4)) : freq

									const height = {
										transform: `translate3d(0, -${freq}px, 0)`
									}
									return (
										<div key={j} className="player-spectrum-bar" style={height} />
									)
								})}
							</div>
							<svg xmlns="http://www.w3.org/2000/svg" version="1.1" width="800">
								<defs>
									<filter id="goo">
										<feGaussianBlur in="SourceGraphic" stdDeviation="10" result="blur" />
										<feColorMatrix
											in="blur"
											mode="matrix"
											values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 19 -9"
											result="goo"
										/>
										<feComposite in="SourceGraphic" in2="goo" operator="atop" />
									</filter>
									<filter id="goo-no-comp">
										<feGaussianBlur in="SourceGraphic" stdDeviation="30" result="blur" />
										<feColorMatrix
											in="blur"
											mode="matrix"
											values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 20 -9"
											result="goo"
										/>
									</filter>
									<filter id="goo-drops">
										<feGaussianBlur in="SourceGraphic" stdDeviation="6" result="blur" />
										<feColorMatrix
											in="blur"
											mode="matrix"
											values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 19 -9"
											result="goo"
										/>
									</filter>
								</defs>
							</svg>
						</div>
					)
				}}
			</PlayerContext.Consumer>
		)
	}
}

Visualizer.contextType = PlayerContext

export default Visualizer
