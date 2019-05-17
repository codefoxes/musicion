import loadSoundBuffer from './BufferLoader'

class Player {
	constructor () {
		this.context = new (AudioContext || webkitAudioContext)()
	}

	play (songPath) {
		// Todo: Get buffer in stream rathen than waiting to complete.
		loadSoundBuffer(songPath, this.context).then((buffer) => {
			const source = this.context.createBufferSource()
			source.buffer = buffer

			source.connect(this.context.destination)
			source.start(0)
		})
	}

	pause () {
		console.log('Paused')
		this.context.suspend()
	}

	resume () {
		console.log('Resuming')
		this.context.resume()
	}
}

export default Player
