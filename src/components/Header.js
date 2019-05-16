import React from 'react'
import '../scss/header.scss'
import { SongContext } from '../context/Song'

class Header extends React.Component {
	constructor (props) {
		super(props)
		this.state = {
		}
	}

	render () {
		return (
			<SongContext.Consumer>
				{ context => (
					<header>
						<h1 className="titlebar center">Musicion</h1>
						<div id="control-panel" className="grid cols-2 control-panel">
							<div className="player-controls">
								<div className="album-art" />
								<div className="controls center">
									<div className="prev">
										<i className="icofont-ui-previous" />
									</div>
									<div id="play" className="play">
										<i className="icofont-ui-play" />
									</div>
									<div className="next">
										<i className="icofont-ui-next" />
									</div>
								</div>
							</div>
							<div className="seekbar">
								<div className="sound-title">
									Song Status : { context.currentSongState }
								</div>
								<div className="seekbar" />
							</div>
						</div>
					</header>
				)}
			</SongContext.Consumer>
		)
	}
}

export default Header
