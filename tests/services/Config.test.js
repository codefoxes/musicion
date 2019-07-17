import '@testing-library/react/cleanup-after-each'

/* eslint import/no-unresolved: 0 */
import '../__mocks__/backend'
import Config from 'renderer/services/Config'

describe('Config service: Config Section', () => {
	it('loads main config and adds folder', () => {
		Config.loadConfig()
		const { all } = Config
		Config.addFoldersToLibrary(['test/folder'])

		expect(all.library.folders).toContain('test/folder')
	})

	it('adds files to album', () => {
		Config.loadConfig()
		const { all } = Config
		all.library.albums = [
			{
				album: 'Test Album',
				albumId: 'test_id',
				files: [{ file: 'existing/file' }]
			}
		]

		const newAlbum = {
			albumId: 'test_id',
			files: [{ file: 'new/file' }]
		}
		Config.addFilesToAlbum(newAlbum, 0)

		expect(all.library.albums[0].files.length).toBe(2)
		expect(all.library.albums[0].files[1].file).toBe('new/file')
	})

	it('adds albums to library', () => {
		const { all } = Config
		all.library.albums = []

		const albums = [{
			album: 'Test Album',
			albumId: 'id_1',
			files: [{ file: 'test/file' }]
		}]
		Config.addAlbumsToLibrary(albums)
		expect(all.library.albums.length).toBe(1)
		expect(all.library.albums[0].album).toBe('Test Album')

		const extraAlbums = [{
			album: 'New Album'
		}, {
			album: 'Test Album',
			albumId: 'id_1',
			files: [{ file: 'test/file2' }, { file: 'test/file3' }]
		}]
		Config.addAlbumsToLibrary(extraAlbums)
		expect(all.library.albums.length).toBe(2)
		expect(all.library.albums[0].files.length).toBe(3)
	})
})

describe('Config service: Playlists Section', () => {
	it('loads playlists config and adds files', () => {
		Config.loadPlaylists()
		const { playlists } = Config
		Config.addFilesToPlaylist('newPlaylist', ['test/file'])

		expect(playlists.length).toBe(2)
		expect(playlists[1].name).toBe('newPlaylist')
	})

	it('adds files to existing playlist', () => {
		const { playlists } = Config
		Config.addFilesToPlaylist('newPlaylist', 'test/file2', true)

		expect(playlists.length).toBe(2)
		expect(playlists[1].name).toBe('newPlaylist')
		expect(playlists[1].files.length).toBe(2)
	})

	it('removes files from playlist', () => {
		const { playlists } = Config

		Config.removeFileFromPlaylist('newPlaylist', 0)
		expect(playlists[1].files.length).toBe(1)

		Config.removeFileFromPlaylist('newPlaylist', 0)
		expect(playlists[1].files.length).toBe(0)
	})

	it('removes playlist', () => {
		const { playlists } = Config
		Config.removePlaylist('newPlaylist')

		expect(playlists.length).toBe(1)
	})
})
