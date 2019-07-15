import '@testing-library/react/cleanup-after-each'
import '@testing-library/jest-dom/extend-expect'

/* eslint import/no-unresolved: 0 */
import React from 'react'
import { render } from '@testing-library/react'
import '../../__mocks__/window'
import PlayerContextProvider from 'renderer/context/PlayerContext'
import Header from 'renderer/components/header/Header'

describe('Header', () => {
	it('renders status bar and controls', () => {
		render(
			<PlayerContextProvider>
				<Header />
			</PlayerContextProvider>
		)

		const statusBar = document.querySelector('[class="status-bar"]')
		const controlPanel = document.querySelector('[id="control-panel"]')

		expect(controlPanel).toBeInTheDocument()
		expect(statusBar).toBeInTheDocument()
	})
})
