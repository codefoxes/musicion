export default class BackendService {
	static sendMessage () {}

	static onMessage (channel, callback) {}

	static selectFolder (onSuccess) {}

	static getConfig = () => ({ library: { folders: [], albums: [] } })

	static saveConfig (configuration) {}

	static getPlaylists = () => [{ name: 'Default', files: [] }]

	static savePlaylists () {
		return new Promise((resolve) => {
			resolve()
		})
	}
}
