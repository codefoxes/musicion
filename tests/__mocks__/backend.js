jest.mock('backend', () => ({
	anyFunction: jest.fn(),
	onMessage: jest.fn(),
	sendMessage: jest.fn(),
	getConfig: () => ({
		library: {
			folders: [],
			albums: []
		}
	}),
	getPlaylists: () => ([
		{
			name: 'Default',
			files: []
		}
	]),
	selectFolder: (cb) => {
		const folders = []
		cb(folders)
	},
	saveConfig: jest.fn(),
	savePlaylists: () => (new Promise((resolve) => { resolve() }))
}))
