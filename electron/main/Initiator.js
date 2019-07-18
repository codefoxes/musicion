const { app, ipcMain } = require('electron')
const Windows = require('./Windows')
const MessageHandler = require('./library/MessageHandler')
const Updater = require('./library/Updater')

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

		const createMainWindow = () => {
			const win = windowsManager.createMainWindow()
			dfd.resolve(win)

			// Run Auto Updater
			const autoUpdater = new Updater()
			autoUpdater.start()
		}

		app.on('ready', () => {
			createMainWindow()
		})

		app.on('window-all-closed', () => {
			if (process.platform !== 'darwin') {
				app.quit()
			}
		})

		app.on('activate', () => {
			if (windowsManager.mainWindow === null) {
				createMainWindow()
			}
		})

		MessageHandler.registerIpcListeners()

		ipcMain.on('reload-window', () => windowsManager.mainWindow.reload())

		return dfd.promise
	}
}

module.exports = Initiator
