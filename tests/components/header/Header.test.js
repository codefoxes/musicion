/* eslint import/no-unresolved: 0 */
import React from 'react'
import { mount } from 'enzyme'
import { render } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'

import '../../__mocks__/window'
import PlayerContextProvider from 'renderer/context/PlayerContext'
import Header from 'renderer/components/header/Header'

describe('Header', () => {
	it('renders status bar and controls', () => {
		render(
			<PlayerContextProvider>
				<Header />
			</PlayerContextProvider>
		)

		const statusBar = document.querySelector('[class="status-bar"]')
		const controlPanel = document.querySelector('[id="control-panel"]')

		expect(controlPanel).toBeInTheDocument()
		expect(statusBar).toBeInTheDocument()
	})

	it('Updates slider on change.', () => {
		const wrapper = mount(
			<PlayerContextProvider>
				<Header />
			</PlayerContextProvider>
		)
		wrapper.find(Header).instance().onSliderChange(50)
		wrapper.update()
		expect(wrapper.find('.seekbar').children().instance().props.value).toBe(50)
	})

	it('Updates player on slider update.', () => {
		const wrapper = mount(
			<PlayerContextProvider>
				<Header />
			</PlayerContextProvider>
		)
		wrapper.instance().state.player.duration = 100
		wrapper.find(Header).instance().onSliderUpdate(50)
		wrapper.update()
		expect(wrapper.instance().state.player.currentPosition).toBe(0.5)
	})
})
