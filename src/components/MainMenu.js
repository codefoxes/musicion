import React from 'react'
import { LibraryContext } from '../context/Library'
import '../scss/mainmenu.scss'

import { remote } from 'electron'

class MainMenu extends React.Component {
	constructor (props) {
		super(props)
		this.state = {
		}
	}

	addFolders = (folders) => {
		this.context.addFolders(folders)
		console.log(this.context)
	}

	selectFolder = () => {
		let folders
		folders = remote.dialog.showOpenDialog({
			properties: ['openDirectory']
		})
		this.addFolders(folders)
	}

	render () {
		return (
			<LibraryContext.Consumer>
				{ () => (
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
				)}
			</LibraryContext.Consumer>
		)
	}
}

MainMenu.contextType = LibraryContext

export default MainMenu
