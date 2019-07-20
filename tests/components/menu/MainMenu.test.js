import '@testing-library/react/cleanup-after-each'
import '@testing-library/jest-dom/extend-expect'

/* eslint import/no-unresolved: 0 */
import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import '../../__mocks__/window'
import '../../__mocks__/backend'
import LibraryContextProvider from 'renderer/context/LibraryContext'
import PlaylistContextProvider from 'renderer/context/PlaylistContext'
import MainMenu from 'renderer/components/menu/MainMenu'

describe('Main Menu: General', () => {
	it('renders menu with Albums & Playlists.', () => {
		const changeMenu = () => {
		}

		const { container } = render(
			<LibraryContextProvider>
				<PlaylistContextProvider>
					<MainMenu changeMenu={changeMenu}/>
				</PlaylistContextProvider>
			</LibraryContextProvider>
		)

		const mainMenu = document.querySelector('[id="main-menu"]')

		expect(mainMenu)
			.toBeInTheDocument()
		expect(container)
			.toHaveTextContent('Albums')
		expect(container)
			.toHaveTextContent('Playlists')
	})

	it('Changes active class on click.', () => {
		const changeMenu = () => {
		}

		render(
			<LibraryContextProvider>
				<PlaylistContextProvider>
					<MainMenu changeMenu={changeMenu}/>
				</PlaylistContextProvider>
			</LibraryContextProvider>
		)

		const defaultPlaylist = document.querySelector('ul.playlists-list li')
		const albums = document.querySelector('ul.albums li')

		expect(defaultPlaylist)
			.toBeInTheDocument()
		expect(albums)
			.toBeInTheDocument()

		fireEvent(
			defaultPlaylist,
			new MouseEvent('click', {
				bubbles: true,
				cancelable: true
			})
		)

		const newDefaultPlaylist = document.querySelector('ul.playlists-list li.active')
		expect(newDefaultPlaylist)
			.toBeInTheDocument()

		fireEvent(
			albums,
			new MouseEvent('click', {
				bubbles: true,
				cancelable: true
			})
		)

		const newAlbums = document.querySelector('ul.albums li.active')
		expect(newAlbums)
			.toBeInTheDocument()
	})

	it('Add folder succeeds.', () => {
		const changeMenu = () => {
		}

		render(
			<LibraryContextProvider>
				<PlaylistContextProvider>
					<MainMenu changeMenu={changeMenu}/>
				</PlaylistContextProvider>
			</LibraryContextProvider>
		)

		const folderAdder = document.querySelector('.title .title-action')

		fireEvent(
			folderAdder,
			new MouseEvent('click', {
				bubbles: true,
				cancelable: true
			})
		)
	})
})

describe('Menu Section: Playlist', () => {
	const addPlaylistMessage = `New Playlist:
	- Adds Playlist input on click.
	- Focuses on Input.
	- Changes input value on type.
	- Adds Playlist on Enter.`

	it(addPlaylistMessage, () => {
		const changeMenu = () => {}

		render(
			<LibraryContextProvider>
				<PlaylistContextProvider>
					<MainMenu changeMenu={changeMenu} />
				</PlaylistContextProvider>
			</LibraryContextProvider>
		)

		fireEvent(
			document.querySelectorAll('.title .title-action')[1],
			new MouseEvent('click', {
				bubbles: true,
				cancelable: true
			})
		)

		const playlistInput = document.querySelector('.add-playlist input')
		expect(playlistInput).toHaveFocus()

		fireEvent.change(playlistInput, { target: { value: 'Awesome' } })
		expect(playlistInput).toHaveValue('Awesome')

		fireEvent.keyDown(playlistInput, { key: 'Enter', code: 13 })

		const updated = new Promise((resolve) => {
			setTimeout(() => { resolve() }, 0)
		})

		return updated.then(() => {
			const updatedPlaylists = document.querySelector('.playlists-list')
			expect(updatedPlaylists).toHaveTextContent('Awesome')
		})
	})

	it('Playlist Input disappears on Escape.', () => {
		const changeMenu = () => {}

		render(
			<LibraryContextProvider>
				<PlaylistContextProvider>
					<MainMenu changeMenu={changeMenu} />
				</PlaylistContextProvider>
			</LibraryContextProvider>
		)

		fireEvent(
			document.querySelectorAll('.title .title-action')[1],
			new MouseEvent('click', {
				bubbles: true,
				cancelable: true
			})
		)

		const playlistInput = document.querySelector('.add-playlist input')
		fireEvent.keyDown(playlistInput, { key: 'Escape', code: 27 })
		const ifPlaylistInput = document.querySelector('.add-playlist input')
		expect(ifPlaylistInput).toBeNull()
	})
})
