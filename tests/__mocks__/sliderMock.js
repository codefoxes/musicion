/* eslint import/no-unresolved: 0, import/no-extraneous-dependencies: 0, global-require: 0 */
import React from 'react'

jest.mock('rc-slider/lib/Slider', () => {
	const Slider = props => (
		<input
			className="rc-slider"
			data-testid="rc-slider"
			onClick={() => { props.onChange(60); props.onAfterChange(60) }}
			value={props.value}
			onChange={() => {}}
		/>
	)

	const PropTypes = require('prop-types')

	Slider.propTypes = {
		value: PropTypes.number.isRequired,
		onChange: PropTypes.func.isRequired,
		onAfterChange: PropTypes.func.isRequired
	}

	return Slider
})
