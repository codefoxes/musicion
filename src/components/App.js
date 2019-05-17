import React from 'react'
import Header from './Header'
import '../scss/app.scss'

class App extends React.Component {
	constructor (props) {
		super(props)
		this.context = null
		this.state = {
		}
	}

	render () {
		return (
			<div className="component-app">
				<Header />
				<main>
					Library
				</main>
			</div>
		)
	}
}

export default App
