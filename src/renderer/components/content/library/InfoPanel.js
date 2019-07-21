import React from 'react'
import PropTypes from 'prop-types'
import NoErrorImage from '../../shared/NoErrorImage'

import './InfoPanel.scss'

function InfoField (props) {
	const { field, tags, handleChange } = props

	const capitalize = str => str.charAt(0).toUpperCase() + str.slice(1)

	return (
		<div className={`field-wrap ${field}`}>
			<div className="filed-heading">{ capitalize(field) }</div>
			<input disabled type="text" className="field" value={tags[field] || ''} onChange={e => handleChange(e, field)} />
		</div>
	)
}

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
				<InfoField field="title" tags={tags} handleChange={handleChange} />
				<InfoField field="album" tags={tags} handleChange={handleChange} />
				<InfoField field="artist" tags={tags} handleChange={handleChange} />
				<InfoField field="composer" tags={tags} handleChange={handleChange} />
				<div className="field-wrap encodingTechnology">
					<div className="filed-heading">Encoding</div>
					<div className="field">
						{ tags.encodingTechnology || ''}
					</div>
				</div>
				<InfoField field="genre" tags={tags} handleChange={handleChange} />
				<InfoField field="performerInfo" tags={tags} handleChange={handleChange} />
				<InfoField field="year" tags={tags} handleChange={handleChange} />
				<div className="field-wrap artwork">
					<div className="filed-heading">Artwork</div>
					<NoErrorImage image={tags.imagePath} alt={tags.title || ''} />
				</div>
			</div>
		</div>
	)
}

/* <div className="actions"> */
/* <button type="button" onClick=() => toggleInfoPanel(file)}>Cancel</button> */
/* <button type="button" className="last">Save</button> */
/* </div> */

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

InfoField.propTypes = {
	field: PropTypes.string.isRequired,
	tags: PropTypes.objectOf(PropTypes.any).isRequired,
	handleChange: PropTypes.func.isRequired
}

export default InfoPanel
