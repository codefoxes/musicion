export const getSongName = (file) => {
	if ('tags' in file && 'title' in file.tags) {
		return file.tags.title
	}
	const splits = file.file.split('/')
	return splits[splits.length - 1].split('.')[0]
}

export default getSongName
