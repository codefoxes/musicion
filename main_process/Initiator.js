const { app, ipcMain } = require('electron')
const Windows = require('./Windows')
const MessageHandler = require('./MessageHandler')

class Deferred {
	constructor () {
		this.promise = new Promise((resolve, reject) => {
			this.reject = reject
			this.resolve = resolve
		})
	}
}

const Initiator = {
	startApp: (mainWindow) => {
		const dfd = new Deferred()
		const windowsManager = new Windows(mainWindow)

		app.on('ready', () => {
			const win = windowsManager.createMainWindow()
			dfd.resolve(win)
		})

		app.on('window-all-closed', () => {
			if (process.platform !== 'darwin') {
				app.quit()
			}
		})

		app.on('activate', () => {
			if (windowsManager.mainWindow === null) {
				const win = windowsManager.createMainWindow()
				dfd.resolve(win)
			}
		})

		const messages = new MessageHandler()
		messages.registerIpcListeners()

		ipcMain.on('reload-window', () => windowsManager.mainWindow.reload())

		return dfd.promise
	}
}

module.exports = Initiator
