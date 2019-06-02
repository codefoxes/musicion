import loadSoundBuffer from './BufferLoader'

class Player {
	constructor () {
		this.context = null
		this.buffer = null
		this.bufferSource = null
		this.audioAnalyser = null
		this.gainNode = null

		this.isPlaying = false
		this.duration = 0
		this.currentPosition = 0
		this.playingIntervalID = null
		this.defaultVolume = 0.8

		this.onStarted = null
		this.onPlaying = null
		this.onEnded = null
		this.onSpectrum = null
	}

	setupAudioContext () {
		/**
		 * Set up AudioContext.
		 *
		 * Current Flow
		 * BufferSource -> GainNode -> Analyzer -> Destination
		 */
		return new Promise((resolve) => {
			if (this.context && this.context.close !== undefined) {
				this.context.close().then(() => {
					this.context = null
					this.bufferSource = null
					this.buffer = null
					this.duration = 0
					this.currentPosition = 0
					clearInterval(this.playingIntervalID)
					this.context = new (AudioContext || webkitAudioContext)()
					resolve()
				})
			} else {
				this.context = new (AudioContext || webkitAudioContext)()
				resolve()
			}
		})
	}

	setUpSongControls (params) {
		this.onStarted = ('onStarted' in params) ? params.onStarted : () => {}
		this.onPlaying = ('onPlaying' in params) ? params.onPlaying : () => {}
		this.onEnded = ('onEnded' in params) ? params.onEnded : () => {}
		this.onSpectrum = ('onSpectrum' in params) ? params.onSpectrum : () => {}

		if ('volume' in params) this.defaultVolume = params.volume
	}

	setUpAnalyser () {
		this.audioAnalyser = this.context.createAnalyser()
		this.audioAnalyser.fftSize = 64
		this.audioAnalyser.smoothingTimeConstant = 0.95
		this.audioAnalyser.connect(this.context.destination)
	}

	setUpGain () {
		this.gainNode = this.context.createGain()
		this.gainNode.connect(this.audioAnalyser)
		this.volume(this.defaultVolume)
	}

	setUpBuffer () {
		if (this.buffer === null) return false
		this.bufferSource = this.context.createBufferSource()
		this.bufferSource.buffer = this.buffer
		this.bufferSource.connect(this.gainNode)
		this.bufferSource.onended = this.endOfSong.bind(this)
		return true
	}

	loadSong (songPath, params) {
		this.setUpSongControls(params)
		// Todo: Get buffer in stream rathen than waiting to complete.
		// Todo: Handle load Error.
		this.setupAudioContext().then(() => {
			loadSoundBuffer(songPath, this.context).then((buffer) => {
				this.buffer = buffer
				this.duration = buffer.duration
				this.setUpAnalyser()
				this.setUpGain()
				this.play()
				this.onStarted(this.duration)
			})
		})
	}

	play () {
		const bufferLoaded = this.setUpBuffer()
		if (!bufferLoaded) return false
		this.bufferSource.start(0, this.currentPosition)
		this.isPlaying = true

		const throttle = 500
		this.playingIntervalID = setInterval(() => {
			this.currentPosition += (throttle / 1000)
			this.onPlaying(this.currentPosition)
		}, throttle)

		this.analyse()
		return true
	}

	pause () {
		this.stop(true)
	}

	seek (position) {
		this.currentPosition = position
		if (this.isPlaying) {
			this.stop(true)
			this.play()
		}
	}

	stop (pause = false) {
		this.bufferSource.stop(0)

		if (!pause) {
			this.currentPosition = 0
		}

		this.isPlaying = false
		clearInterval(this.playingIntervalID)
	}

	endOfSong () {
		// Called on seek, pause and stop
		// Todo: Calculate real ended
		if (Math.abs(this.duration - this.currentPosition) <= 1) {
			this.onEnded()
			this.currentPosition = 0
			this.isPlaying = false
			clearInterval(this.playingIntervalID)
		}
	}

	volume (vol) {
		if (this.gainNode === null) return
		this.gainNode.gain.value = vol
	}

	analyse () {
		setInterval(() => {
			const spectrum = new Uint8Array(this.audioAnalyser.frequencyBinCount)
			this.audioAnalyser.getByteFrequencyData(spectrum)
			const spectrumArray = Array.from(spectrum)
			this.onSpectrum(spectrumArray)
		}, 10)
	}
}

export default Player
