import React from 'react'
import PropTypes from 'prop-types'
import NoErrorImage from '../../shared/NoErrorImage'

import './InfoPanel.scss'

function InfoPanel (props) {
	const { show, file, toggleInfoPanel, handleInfoChange } = props
	const showClass = show ? 'show' : ''

	if (file === null) {
		return (
			<div className={`info-panel ${showClass}`}>Info</div>
		)
	}

	const newFile = JSON.parse(JSON.stringify(file))
	const { tags } = newFile

	const handleChange = (e, field) => {
		newFile.tags[field] = e.target.value
		handleInfoChange(newFile)
	}

	return (
		<div className={`info-panel ${showClass}`}>
			<div className="file-details">
				<div className="close center" onClick={() => toggleInfoPanel(file)}>x</div>
				<div className="heading">Song Details</div>
				<div className="field-wrap title">
					<div className="filed-heading">Title</div>
					<input disabled type="text" className="field" value={tags.title || ''} onChange={e => handleChange(e, 'title')} />
				</div>
				<div className="field-wrap album">
					<div className="filed-heading">Album</div>
					<input disabled type="text" className="field" value={tags.album || ''} onChange={e => handleChange(e, 'album')} />
				</div>
				<div className="field-wrap artist">
					<div className="filed-heading">Artist</div>
					<input disabled type="text" className="field" value={tags.artist || ''} onChange={e => handleChange(e, 'artist')} />
				</div>
				<div className="field-wrap composer">
					<div className="filed-heading">Composer</div>
					<input disabled type="text" className="field" value={tags.composer || ''} onChange={e => handleChange(e, 'composer')} />
				</div>
				<div className="field-wrap encodingTechnology">
					<div className="filed-heading">Encoding</div>
					<div className="field">
						{ tags.encodingTechnology || ''}
					</div>
				</div>
				<div className="field-wrap genre">
					<div className="filed-heading">Genre</div>
					<input disabled type="text" className="field" value={tags.genre || ''} onChange={e => handleChange(e, 'genre')} />
				</div>
				<div className="field-wrap performerInfo">
					<div className="filed-heading">Performer</div>
					<input disabled type="text" className="field" value={tags.performerInfo || ''} onChange={e => handleChange(e, 'performerInfo')} />
				</div>
				<div className="field-wrap year">
					<div className="filed-heading">Year</div>
					<input disabled type="text" className="field" value={tags.year || ''} onChange={e => handleChange(e, 'year')} />
				</div>
				<div className="field-wrap artwork">
					<div className="filed-heading">Artwork</div>
					<NoErrorImage image={tags.imagePath} alt={tags.title || ''} />
				</div>
			</div>
			{/* <div className="actions"> */}
			{/* <button type="button" onClick={() => toggleInfoPanel(file)}>Cancel</button> */}
			{/* <button type="button" className="last">Save</button> */}
			{/* </div> */}
		</div>
	)
}

InfoPanel.propTypes = {
	show: PropTypes.bool.isRequired,
	file: PropTypes.shape({
		file: PropTypes.string
	}),
	toggleInfoPanel: PropTypes.func.isRequired,
	handleInfoChange: PropTypes.func.isRequired
}

InfoPanel.defaultProps = {
	file: null
}

export default InfoPanel
