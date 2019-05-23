import p5 from 'p5'
import 'p5/lib/addons/p5.sound'

class Player {
	constructor () {
		this.isPlaying = false
		this.duration = 0
		this.currentPosition = 0
		this.playingIntervalID = null
		this.onPlayingCallBack = null
		this.onEndedCallBack = null
		this.song = null
		this.spectrum = []
		this.onSpectrum = null
	}

	loadSong (songPath, onStarted, onPlaying, onEnded, onSpectrum) {
		this.onPlayingCallBack = onPlaying
		this.onEndedCallBack = onEnded
		this.onSpectrum = onSpectrum
		this.song = new p5.SoundFile(songPath, () => {
			this.duration = this.song.duration()
			this.song.playMode('restart')
			this.song.onended(this.endOfSong.bind(this))
			this.play()

			this.fft = new p5.FFT(0.9, 32)
			this.fft.setInput(this.song)
		})
		// Access audioContext workaround: this.song._counterNode.context
	}

	play () {
		this.song.play()
		this.isPlaying = true

		const throttle = 500
		this.playingIntervalID = setInterval(() => {
			this.currentPosition += (throttle / 1000)
			this.onPlayingCallBack(this.currentPosition)
		}, throttle)

		setInterval(() => {
			this.onSpectrum(this.fft.analyze())
		}, 10)
	}

	pause () {
		this.song.pause()
		this.isPlaying = false
		clearInterval(this.playingIntervalID)
	}

	seek (position) {
		this.currentPosition = position + 0.1
		if (!this.isPlaying) {
			this.song.stop()
		}
		this.song.jump(position)
		if (!this.isPlaying) {
			setTimeout(() => {
				this.song.pause()
			}, 0.1 * 1000)
		}
	}

	stop () {
		this.song.stop()
		this.currentPosition = 0
		this.isPlaying = false
		clearInterval(this.playingIntervalID)
	}

	endOfSong () {
		// Called on seek, pause and stop
		// Todo: Calculate real ended
		if (Math.abs(this.duration - this.currentPosition) <= 1) {
			this.onEndedCallBack()
			this.currentPosition = 0
			this.isPlaying = false
			clearInterval(this.playingIntervalID)
		}
	}

	volume (vol) {
		this.song.setVolume(vol)
	}
}

export default Player
