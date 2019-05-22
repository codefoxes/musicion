import React, { Component, Fragment } from 'react'
import Header from './header/Header'
import Content from './Content'
import '../scss/app.scss'

class App extends Component {
	constructor (props) {
		super(props)
		this.context = null
		this.state = {
		}
	}

	render () {
		return (
			<Fragment>
				<Header />
				<Content />
			</Fragment>
		)
	}
}

export default App
