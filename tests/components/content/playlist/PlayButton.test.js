import '@testing-library/react/cleanup-after-each'
import '@testing-library/jest-dom/extend-expect'

/* eslint import/no-unresolved: 0 */
import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import '../../../__mocks__/backend'
import '../../../__mocks__/audioContext'
import '../../../__mocks__/playerMock'
import PlayButton from 'renderer/components/content/playlist/PlayButton'
import PlaylistContextProvider from 'renderer/context/PlaylistContext'
import PlayerContextProvider from 'renderer/context/PlayerContext'

describe('Play Button', () => {
	it('Renders play button and toggles on click', () => {
		const data = {
			index: 1,
			value: {
				file: 'test.mp3',
				tags: { title: 'Test' }
			}
		}

		render(
			<PlaylistContextProvider>
				<PlayerContextProvider>
					<PlayButton data={data} playlist="Test" />
				</PlayerContextProvider>
			</PlaylistContextProvider>
		)

		const playButton = document.querySelector('.play')
		expect(playButton).toBeInTheDocument()

		fireEvent(
			playButton,
			new MouseEvent('click', {
				bubbles: true,
				cancelable: true
			})
		)

		const updatedButton = document.querySelector('.icofont-ui-pause')
		expect(updatedButton).toBeInTheDocument()

		fireEvent(
			playButton,
			new MouseEvent('click', {
				bubbles: true,
				cancelable: true
			})
		)

		expect(playButton).toBeInTheDocument()
	})

	it('Renders play button without index', () => {
		const data = {
			value: { file: 'test.mp3' }
		}

		render(
			<PlaylistContextProvider>
				<PlayerContextProvider>
					<PlayButton data={data} playlist="Test" />
				</PlayerContextProvider>
			</PlaylistContextProvider>
		)

		const playButton = document.querySelector('.play')
		expect(playButton).toBeInTheDocument()
	})
})
