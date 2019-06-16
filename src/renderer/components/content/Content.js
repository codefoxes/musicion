import React from 'react'
import Split from 'react-split'
import SplitPane from 'react-split-pane'
import MainMenu from '../menu/MainMenu'
import Library from './library/Library'
import Playlist from './playlist/Playlist'
import { SettingsContext } from '../../context/SettingsContext'
import './content.scss'

class Content extends React.Component {
	constructor (props) {
		super(props)
		this.state = {
			activeMenu: 'albums',
			activePlaylist: 'default',
			splitterDefault: [25, 75]
		}
	}

	componentDidMount () {
		const sizes = localStorage.getItem('sidebar')
		if (sizes) {
			const splitterDefault = JSON.parse(sizes)
			this.setState({ splitterDefault })
		}
	}

	changeMenu = (menu, sub) => {
		this.setState({ activeMenu: menu, activePlaylist: sub })
	}

	render () {
		const onDragFinished = (size) => {
			localStorage.setItem('sidebar', JSON.stringify(size))
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
				<SettingsContext.Consumer>
					{(contextSettings) => {
						let defaultSizes = this.state.splitterDefault
						let collapseIndex = null
						if (!contextSettings.settings.showSidebar) {
							collapseIndex = 0
						}
						return (
							<Split direction="horizontal" sizes={defaultSizes} gutterSize={0} className="splitter" onDragEnd={onDragFinished} snapOffset={0} collapsed={collapseIndex}>
								<MainMenu changeMenu={this.changeMenu} activeMenu={this.state.activeMenu} />
								{ activeMenu }
							</Split>
						)
					}}
				</SettingsContext.Consumer>
			</main>
		)
	}
}

export default Content
