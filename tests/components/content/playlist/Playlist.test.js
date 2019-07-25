/* eslint import/no-unresolved: 0 */
import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'

import '../../../__mocks__/backend'
import PlaylistContextProvider from 'renderer/context/PlaylistContext'
import Playlist from 'renderer/components/content/playlist/Playlist'

describe('Playlist', () => {
	it('Renders Playlists.', () => {
		render(
			<PlaylistContextProvider>
				<Playlist playlist="Default" />
			</PlaylistContextProvider>
		)

		const table = document.querySelector('.ReactTable')
		expect(table).toBeInTheDocument()
		expect(table).toHaveTextContent('Test Album')
	})

	it('Removes song.', () => {
		render(
			<PlaylistContextProvider>
				<Playlist playlist="Default" />
			</PlaylistContextProvider>
		)

		const removeButton = document.querySelector('.remove-button')
		expect(removeButton).toBeInTheDocument()

		fireEvent.click(removeButton)

		const updated = new Promise((resolve) => {
			setTimeout(() => { resolve() }, 0)
		})

		return updated.then(() => {
			const table = document.querySelector('.ReactTable')
			expect(table).not.toHaveTextContent('Test Album')
		})
	})
})
