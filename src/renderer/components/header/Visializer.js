import React from 'react'
import { SongContext } from '../../context/Song'

import '../../scss/visualizer.scss'

class Visualizer extends React.Component {
	constructor (props) {
		super(props)
		this.state = {
			spectrum: []
		}
	}

	componentDidMount () {
		this.context.subscribeEvent('onSpectrum', this.onEnded.bind(this))
	}

	onEnded (spectrum) {
		this.setState({ spectrum })
	}

	render () {
		return (
			<SongContext.Consumer>
				{ () => {
					return (
						<div className="player-spectrum">
							<div className="player-spectrum-bars">
								{this.state.spectrum.map((freq, j) => {
									const height = {
										height: freq
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
										<feColorMatrix in="blur" mode="matrix"
											values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 19 -9" result="goo" />
										<feComposite in="SourceGraphic" in2="goo" operator="atop"/>
									</filter>
									<filter id="goo-no-comp">
										<feGaussianBlur in="SourceGraphic" stdDeviation="10" result="blur" />
										<feColorMatrix in="blur" mode="matrix"
											values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 20 -9" result="goo" />
									</filter>
									<filter id="goo-drops">
										<feGaussianBlur in="SourceGraphic" stdDeviation="6" result="blur" />
										<feColorMatrix in="blur" mode="matrix"
											values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 19 -9" result="goo" />
									</filter>
								</defs>
							</svg>
						</div>
					)
				}}
			</SongContext.Consumer>
		)
	}
}

Visualizer.contextType = SongContext

export default Visualizer
