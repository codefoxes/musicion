function loadSoundBuffer (url, context) {
	// Todo: Make multi platform compatible.
	const soundUrl = (url.startsWith('/')) ? `file://${url}` : url

	return new Promise((resolve, reject) => {
		const request = new XMLHttpRequest()
		request.open('GET', soundUrl, true)
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
