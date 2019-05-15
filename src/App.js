import React from 'react'

import loadSoundBuffer from './BufferLoader'

class App extends React.Component {
	constructor (props) {
		super(props)
		this.context = null
		this.state = {
			currentSong: null
		}
	}

	componentDidMount() {
		this.context = new (AudioContext || webkitAudioContext)();
	}

	playSong = songPath => e => {
		// Todo: Get buffer in stream rathen than waiting to complete.
		loadSoundBuffer(songPath, this.context).then((buffer) => {
			var source = this.context.createBufferSource()
			source.buffer = buffer

			source.connect(this.context.destination)
			source.start(0)
		})
	}

	pauseSong = e => {
		this.context.suspend()
	}

	resumeSong = e => {
		this.context.resume()
	}

	render () {
		return (
			<div className="component-app">
				<h1>Musicion Component</h1>
				<button onClick={this.playSong('SultansOfSwing.flac')}>Play Song</button>
				<button onClick={this.pauseSong}>Pause Song</button>
				<button onClick={this.resumeSong}>Resume Song</button>
			</div>
		)
	}
}

export default App
