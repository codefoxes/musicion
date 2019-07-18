const ipcRListeners = []

const electron = {
	require: jest.fn(),
	match: jest.fn(),
	app: jest.fn(),
	remote: {
		app: {
			getPath: jest.fn()
		},
		dialog: {
			mockFolders: undefined,
			showOpenDialog: () => electron.remote.dialog.mockFolders
		}
	},
	ipcRenderer: {
		send: jest.fn(),
		listeners: [],
		on: (channel, listener) => {
			const listenerIndex = ipcRListeners.findIndex(lis => lis.channel === channel)
			if (listenerIndex === -1) {
				ipcRListeners.push({ channel, listeners: [listener] })
			} else {
				ipcRListeners[listenerIndex].listeners.push(listener)
			}
		},
		mockReceive: (channel, message) => {
			const listenerIndex = ipcRListeners.findIndex(lis => lis.channel === channel)
			if (listenerIndex !== -1) {
				ipcRListeners[listenerIndex].listeners.forEach(listener => listener('', message))
			}
		},
		clearListeners: () => { ipcRListeners.length = 0 }
	},
	dialog: jest.fn()
}

module.exports = electron
