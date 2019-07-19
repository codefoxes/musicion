/* eslint import/no-unresolved: 0 */
import React from 'react'
import { mount } from 'enzyme'
import Visualizer from 'renderer/components/header/Visializer'
import PlayerContextProvider from 'renderer/context/PlayerContext'

describe('Visualizer', () => {
	it('Responds on spectrum data.', () => {
		const wrapper = mount(<PlayerContextProvider><Visualizer /></PlayerContextProvider>)
		wrapper.find(Visualizer).instance().onSpectrum([100, 150, 200, 250])
		wrapper.update()
		expect(wrapper.find('.player-spectrum-bars').children().length).toBe(6)
	})
})
