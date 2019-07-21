/* eslint import/no-unresolved: 0, global-require: 0 */

function getMatchMediaFn (matcher) {
	return function match (query) {
		let matches = false
		if (query === matcher) {
			matches = true
		}
		return {
			matches,
			media: query,
			onchange: null,
			addListener: jest.fn(),
			removeListener: cb => cb({ matches: false })
		}
	}
}

describe('MediaQuery', () => {
	it('Sets correct mediaQuery for mobile.', () => {
		window.matchMedia = getMatchMediaFn('(max-width:768px)')

		const mq = require('renderer/services/MediaQuery')
		mq.init()

		expect(mq.mediaQuery.currentMedia).toBe('mobile')
		expect(mq.mediaQuery.currentSize).toBe('')
	})

	it('Sets correct mediaQuery for tablet.', () => {
		window.matchMedia = getMatchMediaFn('(min-width:769px) and (max-width:1023px)')

		const mq = require('renderer/services/MediaQuery')
		mq.init()

		expect(mq.mediaQuery.currentMedia).toBe('tablet-only')
		expect(mq.mediaQuery.currentSize).toBe('tablet')
	})

	it('Sets correct mediaQuery for desktop.', () => {
		window.matchMedia = getMatchMediaFn('(min-width:1024px) and (max-width:1215px)')

		const mq = require('renderer/services/MediaQuery')
		mq.init()

		expect(mq.mediaQuery.currentMedia).toBe('desktop-only')
		expect(mq.mediaQuery.currentSize).toBe('tablet desktop')
	})

	it('Sets correct mediaQuery for widescreen.', () => {
		window.matchMedia = getMatchMediaFn('(min-width:1216px)')

		const mq = require('renderer/services/MediaQuery')
		mq.init()

		expect(mq.mediaQuery.currentMedia).toBe('widescreen')
		expect(mq.mediaQuery.currentSize).toBe('tablet desktop')
	})
})
