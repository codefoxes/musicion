import React, { Component } from 'react'
import Header from './header/Header'
import Content from './content/Content'
import Footer from './footer/Footer'
import { SettingsContext } from '../context/SettingsContext'
import './app.scss'

class App extends Component {
	constructor (props) {
		super(props)
		this.state = {
		}
	}

	render () {
		const classes = `app ${this.context.currentMedia} ${this.context.currentSize}`
		return (
			<div className={classes}>
				<Header />
				<Content />
				<Footer />
			</div>
		)
	}
}

App.contextType = SettingsContext

export default App
