/* eslint import/no-unresolved: 0 */
import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'

import '../../__mocks__/backend'
import '../../__mocks__/window'
import '../../__mocks__/firebase'
import '../../__mocks__/sliderMock'
import SettingsContextProvider from 'renderer/context/SettingsContext'
import PlayerContextProvider from 'renderer/context/PlayerContext'
import Volume from 'renderer/components/header/Volume'

describe('Volume bar', () => {
	it('Changes with proper state.', () => {
		const { getByTestId } = render(
			<SettingsContextProvider>
				<PlayerContextProvider>
					<Volume />
				</PlayerContextProvider>
			</SettingsContextProvider>
		)

		const slider = getByTestId('rc-slider')

		fireEvent(
			slider,
			new MouseEvent('click', {
				bubbles: true,
				cancelable: true
			})
		)

		expect(slider).toHaveValue('60')
	})

	it('Shows on mouse over and hides on mouse out.', () => {
		render(
			<SettingsContextProvider>
				<PlayerContextProvider>
					<Volume />
				</PlayerContextProvider>
			</SettingsContextProvider>
		)

		const volumeWrap = document.querySelector('.volume-wrapper')

		fireEvent.mouseOver(volumeWrap)

		const volumeBar = document.querySelector('.volume-bar')
		expect(volumeBar).toHaveClass('show')

		fireEvent.mouseOut(volumeWrap)

		const updated = new Promise((resolve) => {
			setTimeout(() => { resolve() }, 0)
		})

		return updated.then(() => {
			const updatedVolumeBar = document.querySelector('.volume-bar')
			expect(updatedVolumeBar).not.toHaveClass('show')
		})
	})
})
