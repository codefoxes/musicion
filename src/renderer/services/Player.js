import loadSoundBuffer from './BufferLoader'

class Player {
	constructor () {
		this.context = null
		this.isPlaying = false
		this.duration = 0
		this.currentPosition = 0
		this.playingIntervalID = null
		this.onPlayingCallBack = null
		this.onEndedCallBack = null
		this.buffer = null
		this.bufferSource = null
		this.setupAudioContext()
	}

	setupAudioContext () {
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

	initSource () {
		this.bufferSource = this.context.createBufferSource()
		this.bufferSource.buffer = this.buffer
		this.bufferSource.connect(this.context.destination)

		this.bufferSource.onended = this.endOfSong.bind(this)
	}

	loadSong (songPath, onStarted, onPlaying, onEnded) {
		// Todo: Get buffer in stream rathen than waiting to complete.
		// Todo: Handle load Error.
		this.setupAudioContext().then(() => {
			loadSoundBuffer(songPath, this.context).then((buffer) => {
				this.buffer = buffer
				this.duration = buffer.duration
				this.onPlayingCallBack = onPlaying
				this.play()
				this.onEndedCallBack = onEnded
				onStarted && onStarted(this.duration)

				this.analyser()
			})
		})
	}

	play () {
		// Todo: If this.bufferSource not loaded yet?
		this.initSource()
		this.bufferSource.start(0, this.currentPosition)
		this.isPlaying = true

		const throttle = 500
		this.playingIntervalID = setInterval(() => {
			this.currentPosition += (throttle / 1000)
			this.onPlayingCallBack(this.currentPosition)
		}, throttle)
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
			this.onEndedCallBack()
			this.currentPosition = 0
			this.isPlaying = false
			clearInterval(this.playingIntervalID)
		}
	}

	volume (vol) {
		const gainNode = this.context.createGain()
		gainNode.gain.setValueAtTime(vol, this.context.currentTime)
		gainNode.connect(this.context.destination)

		this.bufferSource.stop(0)
		this.bufferSource = this.context.createBufferSource()
		this.bufferSource.buffer = this.buffer

		this.bufferSource.connect(gainNode)

		this.bufferSource.start(0, this.currentPosition)
	}

	analyser () {
		// const { body } = document
		const bodyWidth = 500
		const bodyHeight = 500
		const canvas = document.getElementById('canvas')
		const ctx = canvas.getContext('2d')
		const fftSize = 512
		const audioAnalyser = this.context.createAnalyser()

		audioAnalyser.fftSize = fftSize
		audioAnalyser.connect(this.context.destination)
		this.bufferSource.connect(audioAnalyser)

		const drawSpectrums = () => {
			const spectrums = new Uint8Array(audioAnalyser.frequencyBinCount)
			audioAnalyser.getByteTimeDomainData(spectrums)
			const length = audioAnalyser.frequencyBinCount
			ctx.fillStyle = 'rgba(0, 210, 200, 1)'
			ctx.lineWidth = 4
			ctx.beginPath()
			for (let i = 0; i < length; i += 1) {
				const x = i / fftSize * bodyWidth
				const y = (Math.log(256 - spectrums[i]) / Math.log(256)) * bodyHeight * 0.9;

				if (i === 0) {
					ctx.moveTo(x, y)
				} else {
					ctx.lineTo(x, y)
				}
			}
			ctx.lineTo(bodyWidth, bodyHeight)
			ctx.lineTo(0, bodyHeight)
			ctx.fill()
		}

		const render = () => {
			ctx.clearRect(0, 0, bodyWidth, bodyHeight)
			drawSpectrums()
		}

		const renderLoop = () => {
			requestAnimationFrame(renderLoop)
			render()
		}

		renderLoop()
	}
}

export default Player
