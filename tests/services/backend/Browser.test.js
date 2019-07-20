/* eslint import/no-unresolved: 0 */
import BackendService from 'renderer/services/backend/Browser'

describe('Browser platform manager', () => {
	it('Sends message.', () => {
		BackendService.sendMessage()
	})

	it('Responds to message.', () => {
		BackendService.onMessage()
	})

	it('Selects folder.', () => {
		BackendService.selectFolder()
	})

	it('Gets config.', () => {
		BackendService.getConfig()
	})

	it('Saves config.', () => {
		BackendService.saveConfig()
	})

	it('Gets Playlist.', () => {
		BackendService.getPlaylists()
	})

	it('Saves Playlist.', () => {
		BackendService.savePlaylists()
	})

	it('Shows context menu.', () => {
		BackendService.showContextMenu()
	})
})
