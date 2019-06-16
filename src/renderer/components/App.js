import React, { Component, Fragment } from 'react'
import Header from './header/Header'
import Content from './content/Content'
import Footer from './footer/Footer'
import './app.scss'

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
				<Footer />
			</Fragment>
		)
	}
}

export default App
