import React from 'react'
import PropTypes from 'prop-types'

const defaultImage = require('./default.svg')

function NoErrorImage (props) {
	const { image, alt } = props
	const imgSrc = (image === undefined) ? defaultImage : `file:///${image}`
	const addDefaultSrc = (e) => {
		e.target.src = defaultImage
	}

	return (
		<img src={imgSrc} alt={alt} onError={addDefaultSrc} />
	)
}

NoErrorImage.propTypes = {
	image: PropTypes.string,
	alt: PropTypes.string.isRequired
}

NoErrorImage.defaultProps = {
	image: undefined
}

export default NoErrorImage
