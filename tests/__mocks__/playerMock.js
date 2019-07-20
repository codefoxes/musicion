jest.mock('renderer/services/Player', () => {
	return () => ({
		loadSong: () => {},
		play: () => {},
		pause: () => {},
		stop: () => {}
	})
})
