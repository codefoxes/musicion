import React from 'react'
import PropTypes from 'prop-types'

const DEFAULT_STATE = {
	settings: {
		showSidebar: true
	}
}

export const SettingsContext = React.createContext(DEFAULT_STATE)

export default class SettingsContextProvider extends React.Component {
	constructor (props) {
		super(props)
		this.state = DEFAULT_STATE
	}

	dispatch = (action, args) => {
		if (action === 'toggle_sidebar') {
			this.setState((prev) => {
				const { settings } = prev
				settings.showSidebar = !prev.settings.showSidebar
				return { settings }
			})
		}
	}

	render () {
		const { children } = this.props
		return (
			<SettingsContext.Provider
				value={{
					...this.state,
					dispatch: this.dispatch
				}}
			>
				{ children }
			</SettingsContext.Provider>
		)
	}
}

SettingsContextProvider.propTypes = {
	children: PropTypes.node.isRequired
}
