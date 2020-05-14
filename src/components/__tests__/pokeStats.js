import React from 'react'
import { render } from '@testing-library/react'
import { PokeStats } from '../pokeStats'
import { POKE_DATA } from '../testingUtils/testingData'

describe('Test PokeStats component functions and renders as expected', () => {
    test('Component renders table headers and name columns', () => {
        const { getByText } = render(<PokeStats pokemon={POKE_DATA} />)

        expect(getByText(/^Stats/))
        expect(getByText('Name'))
        expect(getByText('Speed'))
        expect(getByText('Special Defense'))
        expect(getByText('Special Attack'))
        expect(getByText(/^Defense/))
        expect(getByText(/^Attack/))
    })

    test('Component renders stats as passed in by props', () => {
        const { getByText, getAllByText } = render(<PokeStats pokemon={POKE_DATA} />)

        expect(getByText(String(POKE_DATA.stats[0].base_stat)))
        expect(getAllByText(String(POKE_DATA.stats[1].base_stat)).length).toBe(2)
        expect(getAllByText(String(POKE_DATA.stats[3].base_stat)).length).toBe(2)
    })
})
