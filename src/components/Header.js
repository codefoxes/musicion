import React from 'react'
import '../scss/header.scss'

class Header extends React.Component {
	constructor (props) {
		super(props)
		this.state = {
		}
	}

	render () {
		return (
			<header>
				<h1 className="titlebar center">Musicion</h1>
				<div id="control-panel" className="control-panel">
					<div className="player-controls">
						<div className="album-art" />
						<div className="controls">
							<div className="prev" />
							<div id="play" className="play" />
							<div className="next" />
						</div>
					</div>
				</div>
			</header>
		)
	}
}

export default Header
