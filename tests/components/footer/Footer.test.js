import '@testing-library/react/cleanup-after-each'
import '@testing-library/jest-dom/extend-expect'

/* eslint import/no-unresolved: 0 */
import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import '../../__mocks__/backend'
import '../../__mocks__/firebase'
import '../../__mocks__/window'
import Footer from 'renderer/components/footer/Footer'
import SettingsContextProvider from 'renderer/context/SettingsContext'

describe('Footer', () => {
	it('Renders menu toggler and toggles on click', () => {
		render(
			<SettingsContextProvider>
				<Footer />
			</SettingsContextProvider>
		)

		const toggler = document.querySelector('[class="toggler hidden"]')
		expect(toggler).toBeInTheDocument()

		fireEvent(
			toggler,
			new MouseEvent('click', {
				bubbles: true,
				cancelable: true
			})
		)

		const newToggler = document.querySelector('[class="toggler "]')
		expect(newToggler).toBeInTheDocument()
	})
})
