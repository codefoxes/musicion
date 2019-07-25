/* eslint import/no-unresolved: 0 */
import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'

import '../../../__mocks__/backend'
import AlbumDetails from 'renderer/components/content/library/AlbumDetails'
import PlaylistContextProvider from 'renderer/context/PlaylistContext'
import PlayerContextProvider from 'renderer/context/PlayerContext'

describe('Album Details', () => {
	it('Renders album details.', () => {
		const album = {
			album: 'Test Album',
			files: [{
				file: 'test/file',
				tags: {
					imagePath: 'test-image'
				}
			}]
		}

		const handlers = {
			toggleInfoPanel: jest.fn(),
			expandAlbum: jest.fn()
		}

		jest.spyOn(handlers, 'toggleInfoPanel')

		render(
			<AlbumDetails album={album} toggleInfoPanel={handlers.toggleInfoPanel} expandAlbum={handlers.expandAlbum} />
		)

		const song = document.querySelector('.song')

		fireEvent(
			song,
			new MouseEvent('click', {
				bubbles: true,
				cancelable: true
			})
		)

		expect(handlers.toggleInfoPanel).toHaveBeenCalled()
	})

	it('Fires context menu.', () => {
		const album = {
			album: 'Test Album',
			files: [{
				file: 'test/file',
				tags: {
					imagePath: 'test-image'
				}
			}]
		}

		const handlers = {
			toggleInfoPanel: jest.fn(),
			expandAlbum: jest.fn()
		}

		render(
			<PlaylistContextProvider>
				<PlayerContextProvider>
					<AlbumDetails album={album} toggleInfoPanel={handlers.toggleInfoPanel} expandAlbum={handlers.expandAlbum} />
				</PlayerContextProvider>
			</PlaylistContextProvider>
		)

		const song = document.querySelector('.song')
		fireEvent.contextMenu(song)

		const menuAction = document.querySelector('.menu-action')
		fireEvent.click(menuAction)
	})
})
