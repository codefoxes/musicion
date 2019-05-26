import React from 'react'
import SplitPane from 'react-split-pane'
import MainMenu from '../menu/MainMenu'
import Library from '../library/Library'
import Playlist from './Playlist'
import './content.scss'

class Content extends React.Component {
	constructor (props) {
		super(props)
		this.state = {
			activeMenu: 'albums',
			activePlaylist: 'default'
		}
	}

	changeMenu = (menu, sub) => {
		this.setState({ activeMenu: menu, activePlaylist: sub })
	}

	render () {
		let defaultSize = parseInt(localStorage.getItem('sidebar'), 10)
		if (Number.isNaN(defaultSize)) {
			defaultSize = 200
		}

		const onDragFinished = (size) => {
			localStorage.setItem('sidebar', size)
		}

		let activeMenu

		if (this.state.activeMenu === 'albums') {
			activeMenu = <Library />
		} else if (this.state.activeMenu === 'playlist') {
			activeMenu = <Playlist playlist={this.state.activePlaylist} />
		} else {
			activeMenu = <Library />
		}

		return (
			<main className="content">
				<SplitPane split="vertical" minSize={100} defaultSize={defaultSize} maxSize={500} onDragFinished={onDragFinished}>
					<MainMenu changeMenu={this.changeMenu} activeMenu={this.state.activeMenu} />
					{ activeMenu }
				</SplitPane>
			</main>
		)
	}
}

export default Content