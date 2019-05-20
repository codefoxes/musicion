function loadSoundBuffer (url, context) {
	return new Promise((resolve, reject) => {
		const request = new XMLHttpRequest()
		request.open('GET', url, true)
		request.responseType = 'arraybuffer'

		// Todo: Handle load Error.
		// Todo: Decode asynchronously
		request.onload = () => {
			context.decodeAudioData(request.response, (buffer) => {
				resolve(buffer)
			}, () => {
				reject()
			})
		}
		request.send()
	})
}

export default loadSoundBuffer
