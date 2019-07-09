const { app } = require('electron')
const path = require('path')
const fs = require('fs')
const crypto = require('crypto')
const jsmediatags = require('jsmediatags')

/**
 * Looks like better alternative:
 * https://github.com/borewit/music-metadata
 * But is much larger than jsmediatags
 */

const userPath = app.getPath('userData')
const cachePath = `${userPath}/musicion-cache`
// TODO: CREATE THIS DIRECTORY ON INSTALLATION.

function walkSync (dir, fileList = [], filter) {
	let newFileList = fileList
	fs.readdirSync(dir).forEach((file) => {
		if (fs.statSync(path.join(dir, file)).isDirectory()) {
			newFileList = walkSync(path.join(dir, file), newFileList, filter)
		} else {
			const filePath = path.join(dir, file)
			if ((filter === undefined) || (filter && filter.func(filePath, ...filter.args))) {
				newFileList.push(filePath)
			}
		}
	})
	return newFileList
}

function endsWithAny (string, suffixes) {
	return suffixes.some(suffix => string.endsWith(suffix))
}

function formatTags (rawTags) {
	let formattedTags = {
		album: 'Untitled'
	}

	let hashable = 'Untitled'
	if ('tags' in rawTags) {
		formattedTags = rawTags.tags
		const tagsObject = rawTags.tags
		if (!('album' in tagsObject)) {
			tagsObject.album = 'Untitled'
		}
		hashable = tagsObject.album
		if ('picture' in tagsObject && 'data' in tagsObject.picture) {
			hashable = `${hashable}${tagsObject.picture.data.join('')}`
		}
	}
	formattedTags.albumId = crypto.createHash('md5').update(hashable).digest('hex')
	return formattedTags
}

function getMusicFiles (dir) {
	const supportedMusicExtensions = [
		'.mp3',
		'.flac'
	]
	const filter = {
		func: endsWithAny,
		args: [supportedMusicExtensions]
	}
	return walkSync(dir, [], filter)
}

function getMediaTags (media) {
	return new Promise((resolve, reject) => {
		jsmediatags.read(media, {
			onSuccess: (tags) => {
				const formatted = formatTags(tags)
				resolve(formatted)
			},
			onError: (error) => {
				reject(error)
			}
		})
	})
}

async function asyncForEach (array, callback) {
	const cbRes = []
	for (let index = 0; index < array.length; index += 1) {
		cbRes.push(callback(array[index], index, array))
	}
	await Promise.all(cbRes)
}

async function getAlbums (folders, cacheCover = true) {
	let files = []
	folders.forEach((folder) => {
		files = files.concat(getMusicFiles(folder))
	})
	const albums = []
	// Todo: Runs every time, optimize.
	await asyncForEach(files, async (file, i) => {
		let tags = {}
		try {
			tags = await getMediaTags(file)
		} catch (err) {
			if (err) return false
		}

		if (cacheCover && ('picture' in tags) && ('data' in tags.picture)) {
			const imageName = file.replace(/\//g, '_')
			const ext = tags.picture.format.split('/')[1]
			const imagePath = `${cachePath}/${imageName}.${ext}`
			// Todo: Handle error. Try Catch?
			const arr = Uint8Array.from(tags.picture.data)
			await fs.writeFile(imagePath, arr, (err) => {
				if (err) { /**/ }
				if (files.length === i + 1) { /**/ }
			})
			tags.imagePath = imagePath

			if ('picture' in tags) delete tags.picture
			if ('APIC' in tags) delete tags.APIC
		}

		let index
		const albumExists = albums.some((album, j) => {
			index = j
			return album.albumId === tags.albumId
		})
		if (albumExists && index !== undefined) {
			albums[index].files.push({
				file,
				tags
			})
		} else {
			albums.push({
				albumId: tags.albumId,
				album: tags.album,
				files: [{
					file,
					tags
				}]
			})
		}
		return true
	})
	return albums
}

module.exports = {
	walkSync,
	endsWithAny,
	getMusicFiles,
	getAlbums
}
