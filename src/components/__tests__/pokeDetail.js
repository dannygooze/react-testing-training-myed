import React from 'react'
import { render } from '@testing-library/react'
import { PokeDetail } from '../pokeDetail'
import { POKE_DATA_ONE, POKE_DESC } from '../testingUtils/testingData'
import * as AppContext from '../../context'

describe('Test PokeDetail component renders pokemon or error depending on app state', () => {
    //these constants are here to help with the different state we want each component to be in for a given test
    //these could be moved to the testingData in a refactor
    const pokemon_in_state = { pokemon: POKE_DATA_ONE, error: null, description: POKE_DESC }
    const error_in_state = { pokemon: {}, error: true, description: '' }
    const ERROR_MESSAGE = 'Data was not found in Pokédex'

    test('Pokemon data displays if pokemon object in state', () => {
        //Here I mock a custom hook because I do not need the context for anything other than state rendering
        jest.spyOn(AppContext, 'usePokemonState').mockImplementation(() => pokemon_in_state)

        const { getByText } = render(
                    <PokeDetail />
            )

        expect(getByText("Name")).toBeTruthy()
        expect(getByText(POKE_DATA_ONE.name)).toBeTruthy()
    })

    test('Pokemon data does not display if there is an error, instead display error text', () => {
        jest.spyOn(AppContext, 'usePokemonState').mockImplementation(() => error_in_state)

        const { container, getByText } = render(
            <PokeDetail />
        )

        expect(getByText(ERROR_MESSAGE)).toBeTruthy()
        expect(container.querySelectorAll(POKE_DATA_ONE.name).length).toBe(0)
    })

    test('Nothing renders when initial state is loaded', () => {
        //Here I render the component in a context provider because I want the contexts initial state, which should render nothing
        const { container } = render(
            <AppContext.PokemonProvider>
                <PokeDetail />
            </AppContext.PokemonProvider>
        )

        expect(container.querySelectorAll(ERROR_MESSAGE).length).toBe(0)
        expect(container.querySelectorAll(POKE_DATA_ONE.name).length).toBe(0)
    })
})
