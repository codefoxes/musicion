/* eslint import/no-unresolved: 0 global-require: 0 */
import '../../__mocks__/electron'
import { remote, ipcRenderer } from 'electron'
import BackendService from 'renderer/services/backend/Electron'

const mock = require('mock-fs')

describe('Electron platform manager, Section: IPC', () => {
	it('Sends message to IPC', () => {
		jest.spyOn(ipcRenderer, 'send')
		BackendService.sendMessage()
		expect(ipcRenderer.send).toHaveBeenCalled()
	})

	it('Responds to message from IPC', () => {
		ipcRenderer.clearListeners()

		jest.spyOn(ipcRenderer, 'on')
		let receivedMessage = ''
		BackendService.onMessage('test', (e, message) => {
			receivedMessage = message
		})
		ipcRenderer.mockReceive('test', 'testMessage')
		expect(ipcRenderer.on).toHaveBeenCalled()
		expect(receivedMessage).toBe('testMessage')

		ipcRenderer.clearListeners()
	})

	it('Does not call callback upon cancel select folder.', () => {
		const cb = { cb: () => {} }
		jest.spyOn(cb, 'cb')
		BackendService.selectFolder(cb.cb)
		expect(cb.cb).not.toHaveBeenCalled()
	})

	it('Calls callback upon select folder.', () => {
		remote.dialog.mockFolders = ['test/folder']
		const cb = { cb: () => {} }
		jest.spyOn(cb, 'cb')
		BackendService.selectFolder(cb.cb)
		expect(cb.cb).toHaveBeenCalled()
	})
})

describe('Electron platform manager, Section: fs', () => {
	it('Creates config.', () => {
		mock({
			undefined: {
				'musicion-config.json': '{}'
			}
		})

		const createdConfig = BackendService.createConfig()
		mock.restore()

		const config = { library: { folders: [], albums: [] } }
		expect(createdConfig).toMatchObject(config)
	})

	it('Gets initial config.', () => {
		mock({
			undefined: {
				'musicion-config.json': '{}'
			}
		})

		const config = BackendService.getConfig()
		mock.restore()

		expect(config).toMatchObject({})
	})

	it('Gets initial config, creates if not exists', () => {
		mock({
			undefined: {}
		})

		const config = BackendService.getConfig()
		mock.restore()

		expect(config).toMatchObject({ library: { folders: [], albums: [] } })
	})

	it('Saves config.', () => {
		mock({
			undefined: {
				'musicion-config.json': '{}'
			}
		})

		const fs = require('fs')
		BackendService.saveConfig({ test: 'test' })
		const config = fs.readFileSync('undefined/musicion-config.json', 'utf8')
		mock.restore()

		expect(config).toMatch('{\n\t"test": "test"\n}')
	})

	it('Save config throws error on no access.', () => {
		mock({
			undefined: mock.file({
				mode: 0o444
			})
		})

		expect(() => {
			BackendService.saveConfig({ test: 'test' })
		}).toThrow()
		mock.restore()
	})
})
