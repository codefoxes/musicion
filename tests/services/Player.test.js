/* eslint import/no-unresolved: 0 */
import path from 'path'
import Player from 'renderer/services/Player'
import '../__mocks__/audioContext'

describe('Player service', () => {
	it('load song sets up AudioContext.', () => {
		const testMusic = path.resolve(__dirname, '../__mocks__/test.mp3')
		const playerObj = new Player()

		const params = {
			onStarted: () => {}
		}
		playerObj.loadSong(testMusic, params)

		expect(AudioContext).toHaveBeenCalledTimes(1)
	})

	it('play before load is falsy.', () => {
		const playerObj = new Player()
		const result = playerObj.play()

		expect(result).toBeFalsy()
	})

	it('play sets up isPlaying.', () => {
		const playerObj = new Player()
		playerObj.setUpBuffer = () => true
		playerObj.bufferSource = {
			start: () => {}
		}

		const result = playerObj.play()
		expect(result).toBeTruthy()
		expect(playerObj.isPlaying).toBeTruthy()
	})

	it('pause pauses & retains current position.', () => {
		const playerObj = new Player()
		playerObj.bufferSource = {
			stop: () => {}
		}
		playerObj.isPlaying = true
		playerObj.currentPosition = 10

		playerObj.pause()
		expect(playerObj.currentPosition).toBe(10)
		expect(playerObj.isPlaying).toBeFalsy()
	})

	it('stop stops & clears current position.', () => {
		const playerObj = new Player()
		playerObj.bufferSource = {
			stop: () => {}
		}
		playerObj.isPlaying = true
		playerObj.currentPosition = 10

		playerObj.stop()
		expect(playerObj.currentPosition).toBe(0)
		expect(playerObj.isPlaying).toBeFalsy()
	})

	it('endOfSong ends correctly.', () => {
		const playerObj = new Player()
		playerObj.onEnded = () => {}
		playerObj.isPlaying = true
		playerObj.currentPosition = 10
		playerObj.duration = 10

		playerObj.endOfSong()
		expect(playerObj.currentPosition).toBe(0)
		expect(playerObj.isPlaying).toBeFalsy()

		playerObj.isPlaying = true
		playerObj.currentPosition = 5
		playerObj.duration = 10

		playerObj.endOfSong()
		expect(playerObj.currentPosition).toBe(5)
		expect(playerObj.isPlaying).toBeTruthy()
	})

	it('seeks to correct position.', () => {
		const playerObj = new Player()
		playerObj.bufferSource = {
			stop: () => {}
		}
		playerObj.isPlaying = true
		playerObj.currentPosition = 10

		playerObj.seek(20)
		expect(playerObj.currentPosition).toBe(20)
	})

	it('creates analyzer node.', () => {
		const playerObj = new Player()
		playerObj.context = new AudioContext()
		playerObj.setUpAnalyser()
		expect(playerObj.audioAnalyser.fftSize).toBe(64)
		expect(playerObj.audioAnalyser.smoothingTimeConstant).toBe(0.95)
	})

	it('creates gain node.', () => {
		const playerObj = new Player()
		playerObj.context = new AudioContext()
		playerObj.setUpGain()
		expect(playerObj.gainNode.gain.value).toBe(playerObj.defaultVolume)
	})
})
