const { ipcMain } = require('electron')
const { getAlbums } = require('./Helpers')
const Windows = require('./Windows')

const MessageHandler = {
	registerIpcListeners: () => {
		ipcMain.on('get-albums', (e, folders) => {
			getAlbums(folders).then((albums) => {
				MessageHandler.sendMessage('albums', albums)
			}).catch((err) => {
				console.log(err)
			})
		})
	},

	sendMessage: (channel, message, window = null) => {
		let targetWindow = window
		if (targetWindow === null) {
			const windowsManager = new Windows()
			targetWindow = windowsManager.mainWindow
		}
		targetWindow.webContents.send(channel, message)
	}
}

module.exports = MessageHandler
