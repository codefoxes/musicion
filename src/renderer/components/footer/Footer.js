import React from 'react'
import { SettingsContext } from '../../context/SettingsContext'

import './Footer.scss'

function Footer () {
	return (
		<footer>
			<SettingsContext.Consumer>
				{(contextSettings) => {
					const hiddenClass = contextSettings.settings.showSidebar ? '' : 'hidden'
					return (
						<div className={`toggler ${hiddenClass}`} onClick={() => contextSettings.dispatch('toggle_sidebar')}>
							<i className="icofont-square-left" />
						</div>
					)
				}}
			</SettingsContext.Consumer>
		</footer>
	)
}

export default Footer
