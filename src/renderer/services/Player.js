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
}

export default Player
