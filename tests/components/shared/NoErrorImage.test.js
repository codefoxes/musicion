import '@testing-library/react/cleanup-after-each'
import '@testing-library/jest-dom/extend-expect'

/* eslint import/no-unresolved: 0 */
import React from 'react'
import { render, fireEvent } from '@testing-library/react'
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
			<NoErrorImage image="demo-image" alt="test-image" />
		)

		expect(getByAltText('test-image')).toHaveAttribute('src', 'file:///demo-image')
	})

	it('Renders default image on load error.', () => {
		const { getByAltText } = render(
			<NoErrorImage image="not-an-image" alt="test-image" />
		)

		fireEvent(
			getByAltText('test-image'),
			new Event('error', {
				bubbles: true,
				cancelable: true
			})
		)

		expect(getByAltText('test-image')).toHaveAttribute('src', 'stubbed-file')
	})
})
