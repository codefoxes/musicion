/* eslint import/no-unresolved: 0 */
import getSongName from 'renderer/services/Helpers'

describe('Get Song name', () => {
	it('returns song name from file path.', () => {
		const file = {
			file: '/some/path/music.mp3'
		}
		const musicName = getSongName(file)
		expect(musicName).toBe('music')
	})

	it('returns song name from tags.', () => {
		const file = {
			tags: {
				title: 'Test Music'
			}
		}
		const musicName = getSongName(file)
		expect(musicName).toBe('Test Music')
	})
})
