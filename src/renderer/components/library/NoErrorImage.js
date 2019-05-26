import React from 'react'

const defaultImage = require('../default.svg')

function NoErrorImage (props) {
	const { image, alt } = props
	const addDefaultSrc = (e) => {
		e.target.src = defaultImage
	}

	return (
		<img src={`file:///${image}`} alt={alt} onError={addDefaultSrc} />
	)
}

export default NoErrorImage
