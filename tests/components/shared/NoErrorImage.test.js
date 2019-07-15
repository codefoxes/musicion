import '@testing-library/react/cleanup-after-each'
import '@testing-library/jest-dom/extend-expect'

/* eslint import/no-unresolved: 0 */
import React from 'react'
import { render } from '@testing-library/react'
import NoErrorImage from 'renderer/components/shared/NoErrorImage'

describe('No Error Image', () => {
	it('Renders default image', () => {
		const { getByAltText } = render(
			<NoErrorImage alt="test-image" />
		)

		expect(getByAltText('test-image')).toHaveAttribute('src', 'stubbed-file')
	})

	it('Renders input image.', () => {
		const { getByAltText } = render(
			<NoErrorImage image="not-an-image" alt="test-image" />
		)

		expect(getByAltText('test-image')).toHaveAttribute('src', 'file:///not-an-image')
	})
})
