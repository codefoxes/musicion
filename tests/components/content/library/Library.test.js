/* eslint import/no-unresolved: 0 */
import React from 'react'
import { mount } from 'enzyme'
import { render, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'

import '../../../__mocks__/backend'
import Library from 'renderer/components/content/library/Library'
import LibraryContextProvider from 'renderer/context/LibraryContext'
import PlaylistContextProvider from 'renderer/context/PlaylistContext'

describe('Library', () => {
	it('Renders list of albums and expands.', () => {
		render(
			<LibraryContextProvider>
				<PlaylistContextProvider>
					<Library />
				</PlaylistContextProvider>
			</LibraryContextProvider>
		)

		const albumsGrid = document.querySelector('.albums-grid')
		const albumThumb = document.querySelector('.album-thumbnail')
		const firstAlbumName = document.querySelector('.album-name')
		const albumsCount = albumsGrid.children.length

		expect(albumsCount).toBe(1)
		expect(albumsGrid).toBeInTheDocument()
		expect(firstAlbumName).toHaveTextContent('Test Album')

		fireEvent(
			albumThumb,
			new MouseEvent('click', {
				bubbles: true,
				cancelable: true
			})
		)

		const singleAlbum = document.querySelector('.album')
		expect(singleAlbum).toHaveClass('expanded')

		fireEvent(
			albumThumb,
			new MouseEvent('click', {
				bubbles: true,
				cancelable: true
			})
		)

		expect(singleAlbum).not.toHaveClass('expanded')
	})

	it('Fires context menu.', () => {
		render(
			<LibraryContextProvider>
				<PlaylistContextProvider>
					<Library />
				</PlaylistContextProvider>
			</LibraryContextProvider>
		)

		const albumThumb = document.querySelector('.album-thumbnail')
		fireEvent.contextMenu(albumThumb)
	})

	it('Adds album to Playlist.', () => {
		const wrapper = mount(
			<LibraryContextProvider>
				<PlaylistContextProvider>
					<Library />
				</PlaylistContextProvider>
			</LibraryContextProvider>
		)
		const plContext = wrapper.find(PlaylistContextProvider).instance()
		jest.spyOn(plContext, 'addSong')
		wrapper.find(Library).instance().addAlbumToPlaylist(plContext, 'Default', { name: 'Test' })
		expect(plContext.addSong).toHaveBeenCalled()
	})

	it('Toggles info panel.', () => {
		const wrapper = mount(
			<LibraryContextProvider>
				<PlaylistContextProvider>
					<Library />
				</PlaylistContextProvider>
			</LibraryContextProvider>
		)
		const file = {
			file: 'test-file',
			tags: {}
		}
		wrapper.find(Library).instance().toggleInfoPanel(file)
		wrapper.update()
		expect(wrapper.find(Library).instance().state.infoFile).toMatchObject(file)

		file.file = 'test-file-2'

		wrapper.find(Library).instance().handleInfoChange(file)
		expect(wrapper.find(Library).instance().state.infoFile).toMatchObject(file)
	})
})
