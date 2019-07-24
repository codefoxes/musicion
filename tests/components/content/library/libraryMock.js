jest.mock('backend', () => ({
	onMessage: jest.fn(),
	sendMessage: jest.fn(),
	getConfig: () => ({
		library: {
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
	getPlaylists: () => ([])
}))
