import BackendService from 'backend'

let configuration
let playlists

export default class Config {
	static get all () {
		return configuration
	}

	static loadConfig () {
		// Todo: Maybe asynchronous
		configuration = BackendService.getConfig()
	}

	static addFoldersToLibrary (folders) {
		configuration.library.folders = configuration.library.folders.concat(
			folders.filter(item => configuration.library.folders.indexOf(item) < 0)
		)

		BackendService.saveConfig(configuration)
		return configuration.library
	}

	static addFilesToAlbum (album, i) {
		const songFiles = []
		configuration.library.albums[i].files.forEach((songFile) => {
			songFiles.push(songFile.file)
		})
		configuration.library.albums[i].files = configuration.library.albums[i].files.concat(
			album.files.filter(songFile => songFiles.indexOf(songFile.file) === -1)
		)
	}

	static addAlbumsToLibrary (albums) {
		// Todo: Different Albums can have same name.
		const albumNames = []
		configuration.library.albums.forEach((album) => {
			albumNames.push(album.album)
		})

		let albumExists = false
		albums.forEach((album) => {
			const configAlbumIndex = albumNames.indexOf(album.album)
			if (configAlbumIndex !== -1) {
				albumExists = true
				Config.addFilesToAlbum(album, configAlbumIndex)
			}
		})

		if (!albumExists) {
			configuration.library.albums = configuration.library.albums.concat(albums)
		}

		BackendService.saveConfig(configuration)
		return configuration.library
	}

	static get playlists () {
		return playlists
	}

	static loadPlaylists () {
		if (playlists !== undefined) return
		playlists = BackendService.getPlaylists()
	}

	static addFilesToPlaylist (playlistName, files, deDuplicate = false) {
		let playlistExists = false
		let playlistIndex = null

		for (let i = 0; i < playlists.length; i += 1) {
			if (playlists[i].name === playlistName) {
				playlistExists = true
				playlistIndex = i
				break
			}
		}

		if (playlistExists) {
			let newFiles = files
			if (!Array.isArray(files)) {
				newFiles = [files]
			}

			if (deDuplicate) {
				const songFiles = []
				playlists[playlistIndex].files.forEach((songFile) => {
					songFiles.push(songFile.file)
				})
				playlists[playlistIndex].files = playlists[playlistIndex].files.concat(
					newFiles.filter(songFile => songFiles.indexOf(songFile.file) === -1)
				)
			}
			playlists[playlistIndex].files = playlists[playlistIndex].files.concat(newFiles)
		} else {
			const newPlaylist = {
				name: playlistName,
				files: []
			}
			if (files !== undefined) {
				if (Array.isArray(files)) {
					newPlaylist.files = files
				}
				if (typeof files === 'object' && files !== null) {
					newPlaylist.files = [files]
				}
			}
			playlists.push(newPlaylist)
		}

		return BackendService.savePlaylists(playlists)
	}

	static removeFileFromPlaylist (playlistName, index) {
		const playlistIndex = playlists.findIndex(playlist => playlist.name === playlistName)
		playlists[playlistIndex].files.splice(index, 1)

		return BackendService.savePlaylists(playlists)
	}

	static removePlaylist (playlistName) {
		playlists.forEach((playlist, i, original) => {
			if (playlist.name === playlistName) {
				original.splice(i, 1)
			}
		})

		return BackendService.savePlaylists(playlists)
	}
}
