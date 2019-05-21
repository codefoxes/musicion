import React from 'react'
import SplitPane from 'react-split-pane'
import MainMenu from './MainMenu'
import Library from './library/Library'
import '../scss/content.scss'

class Content extends React.Component {
	constructor (props) {
		super(props)
		this.state = {
		}
	}

	render () {
		let defaultSize = parseInt(localStorage.getItem('sidebar'), 10)
		if (Number.isNaN(defaultSize)) {
			defaultSize = 200
		}

		const onDragFinished = (size) => {
			localStorage.setItem('sidebar', size)
		}

		return (
			<main className="content">
				<SplitPane split="vertical" minSize={100} defaultSize={defaultSize} maxSize={500} onDragFinished={onDragFinished}>
					<MainMenu />
					<Library />
				</SplitPane>
			</main>
		)
	}
}

export default Content
