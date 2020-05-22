import React from 'react'
import { render } from '@testing-library/react'
import { NotFound } from '../notFound'

test('Test NotFound component renders', () => {
    const { getByText } = render(<NotFound />)

    expect(getByText('Data was not found in Pokédex'))
})
