/* eslint import/no-unresolved: 0 */
import React from 'react'
import { render } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'

import '../__mocks__/window'
import '../__mocks__/backend'
import '../__mocks__/firebase'
import App from 'renderer/components/App'
import SettingsContextProvider from 'renderer/context/SettingsContext'
import LibraryContextProvider from 'renderer/context/LibraryContext'
import PlaylistContextProvider from 'renderer/context/PlaylistContext'
import PlayerContextProvider from 'renderer/context/PlayerContext'

test('App loads without crashing', () => {
	render(
		<SettingsContextProvider>
			<LibraryContextProvider>
				<PlaylistContextProvider>
					<PlayerContextProvider>
						<App />
					</PlayerContextProvider>
				</PlaylistContextProvider>
			</LibraryContextProvider>
		</SettingsContextProvider>
	)

	const titleBar = document.querySelector('.title-bar')
	const header = document.querySelector('header')
	const main = document.querySelector('main')
	const footer = document.querySelector('footer')

	expect(titleBar).toBeInTheDocument()
	expect(header).toBeInTheDocument()
	expect(main).toBeInTheDocument()
	expect(footer).toBeInTheDocument()
})
