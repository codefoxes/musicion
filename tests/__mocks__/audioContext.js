global.AudioContext = jest.fn(() => ({
	decodeAudioData: jest.fn(),
	createAnalyser: jest.fn(() => ({
		fftSize: 20,
		smoothingTimeConstant: 1,
		connect: jest.fn()
	})),
	createGain: jest.fn(() => ({
		gain: { value: 0 },
		connect: jest.fn()
	}))
}))
