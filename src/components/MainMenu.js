import React from 'react'
import '../scss/mainmenu.scss'

import { remote } from 'electron'

class MainMenu extends React.Component {
	constructor (props) {
		super(props)
		this.state = {
		}
	}

	selectFolder = () => {
		console.log('select')
		let dir
		dir = remote.dialog.showOpenDialog({
			properties: ['openDirectory']
		})
		console.log(dir)
	}

	render () {
		return (
			<div className="main-menu">
				<ul>
					<li>
						<div>Library</div>
						<ul className="child">
							<li onClick={this.selectFolder}>Add Folder</li>
						</ul>
					</li>
				</ul>
			</div>
		)
	}
}

export default MainMenu
