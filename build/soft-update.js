// Electron Soft Update Build.
const shell = require('shelljs')
const dirsum = require('dirsum')
const ver = require('../package.json').version

const pathSafeVersion = ver.split('.').join('_')
const zipFile = `musicion_${pathSafeVersion}.zip`

shell.rm('-rf', 'dist/soft_update')

shell.mkdir('-p', 'dist/soft_update/main_process', 'dist/soft_update/renderer')

shell.cp('-R', 'main_process', 'dist/soft_update/')
shell.cp('-R', 'renderer', 'dist/soft_update/')

shell.exec(`echo ${ver} > dist/soft_update/current_version.txt`)

const targetPath = 'dist/soft_update/'

dirsum.digest(targetPath, 'sha1', (error, hashes) => {
	if (error === undefined && Object.prototype.hasOwnProperty.call(hashes, 'hash')) {
		const checksum = hashes.hash
		console.log('Checksum: ', checksum)

		shell.exec(`cd dist/soft_update/ && zip -r ${zipFile} ./*`)

		shell.exec(`echo ${checksum} > dist/soft_update/checksum.txt`)
		shell.rm('-rf', 'dist/soft_update/main_process')
		shell.rm('-rf', 'dist/soft_update/renderer')
		shell.rm('-rf', 'dist/soft_update/current_version.txt')
	}
})
