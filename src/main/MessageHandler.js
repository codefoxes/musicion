const { ipcMain } = require('electron')
const { getAlbums } = require('./Helpers')
const Windows = require('./Windows')

class MessageHandler {
	registerIpcListeners () {
		ipcMain.on('get-albums', (e, folders) => {
			getAlbums(folders).then((albums) => {
				const windowsManager = new Windows()
				windowsManager.mainWindow.webContents.send('albums', albums)
			}).catch((err) => {
				console.log(err)
			})
		})
	}
}

module.exports = MessageHandler
