/* eslint import/no-unresolved: 0 */
import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'

import './libraryMock'
import Library from 'renderer/components/content/library/Library'
import LibraryContextProvider from 'renderer/context/LibraryContext'
import PlaylistContextProvider from 'renderer/context/PlaylistContext'

describe('Library', () => {
	it('Renders list of albums.', () => {
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
})
