jest.mock('backend', () => ({
	anyFunction: jest.fn(),
	onMessage: jest.fn(),
	sendMessage: jest.fn(),
	getConfig: () => ({
		library: {
			folders: [],
			albums: [
				{
					albumId: '123',
					album: 'Test Album',
					files: [
						{
							file: 'test.mp3',
							tags: { imagePath: 'test.jpg' }
						}
					]
				}
			]
		}
	}),
	getPlaylists: () => ([
		{
			name: 'Default',
			files: [
				{
					file: 'test.mp3',
					tags: { album: 'Test Album', imagePath: 'test.jpg' }
				}
			]
		}
	]),
	selectFolder: (cb) => {
		const folders = []
		cb(folders)
	},
	saveConfig: jest.fn(),
	savePlaylists: () => (new Promise((resolve) => { resolve() })),
	showContextMenu: jest.fn()
}))
