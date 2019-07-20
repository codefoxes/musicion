import '@testing-library/react/cleanup-after-each'
import '@testing-library/jest-dom/extend-expect'

/* eslint import/no-unresolved: 0 */
import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import '../../__mocks__/backend'
import PlaylistContextProvider from 'renderer/context/PlaylistContext'
import PlayerContextProvider from 'renderer/context/PlayerContext'
import Controls from 'renderer/components/header/Controls'

describe('Player Controls', () => {
	it('renders 3 buttons', () => {
		render(
			<PlaylistContextProvider>
				<PlayerContextProvider>
					<Controls />
				</PlayerContextProvider>
			</PlaylistContextProvider>
		)

		const controlButtons = document.querySelectorAll('.control-button')
		expect(controlButtons.length).toEqual(3)
	})

	it('Does nothing on initial click play button.', () => {
		// Todo: Play first song or last saved state song.
		render(
			<PlaylistContextProvider>
				<PlayerContextProvider>
					<Controls />
				</PlayerContextProvider>
			</PlaylistContextProvider>
		)

		const playButton = document.querySelector('.play')

		fireEvent(
			playButton,
			new MouseEvent('click', {
				bubbles: true,
				cancelable: true
			})
		)

		const updatedButton = document.querySelector('.icofont-ui-play')
		expect(updatedButton.outerHTML).toMatch('play')
	})
})
