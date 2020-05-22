import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import { Search } from '../search'
import { POKE_DATA_ONE, POKE_DESC } from '../testingUtils/testingData'
import * as AppContext from '../../context'
import axios from 'axios';
import { act } from 'react-dom/test-utils'

jest.mock('axios')
const MOCK_DATA = {
    data: {
        ...POKE_DATA_ONE,
        flavor_text_entries: [
            {
                language: {
                    name: 'en'
                },
                flavor_text: POKE_DESC
            }
        ]
    }
}
axios.get.mockResolvedValue(MOCK_DATA)

const ERROR_MESSAGE = {
    error: 'Error with pokeAPI'
}

const AppProviders = ({ children }) => {
    return (
        <AppContext.PokemonProvider>
            {children}
        </AppContext.PokemonProvider>
    )
}

const customRender = (ui, options) => render(ui, { wrapper: AppProviders, ...options })

describe('Test search component makes appropriate dispatch calls', () => {
    test('Input component makes appropriate dispatches calls when submit button is clicked', async () => {
        const mockDispatch = jest.fn()
        jest.spyOn(AppContext, 'usePokemonDispatch').mockImplementation(() => mockDispatch)

        const { container, getByText } = customRender(<Search />)
        await act(async () => {
            await fireEvent.change(container.querySelector('input'), { target: { value: POKE_DATA_ONE.name } })
            await fireEvent.click(getByText('Search'))
        })

        expect(mockDispatch.mock.calls.length).toBe(3)
        expect(mockDispatch.mock.calls[0][0].type).toBe('SET_ERROR')
        expect(mockDispatch.mock.calls[0][0].payload).toBe('')
        expect(mockDispatch.mock.calls[1][0].type).toBe('SET_POKEMON')
        expect(mockDispatch.mock.calls[1][0].payload).toBe(MOCK_DATA.data)
        expect(mockDispatch.mock.calls[2][0].type).toBe('SET_FLAVOR_TEXT')
        expect(mockDispatch.mock.calls[2][0].payload).toBe(POKE_DESC)
    })

    test('Test that a bad search calls error dispatch', async () => {
        axios.get.mockRejectedValue(ERROR_MESSAGE)
        const mockDispatch = jest.fn()
        jest.spyOn(AppContext, 'usePokemonDispatch').mockImplementation(() => mockDispatch)

        const { container, getByText } = customRender(<Search />)
        await act(async () => {
            await fireEvent.change(container.querySelector('input'), { target: { value: 'pika' } })
            await fireEvent.click(getByText('Search'))
        })

        expect(mockDispatch.mock.calls.length).toBe(2)
        expect(mockDispatch.mock.calls[0][0].type).toBe('SET_ERROR')
        expect(mockDispatch.mock.calls[0][0].payload).toBe('')
        expect(mockDispatch.mock.calls[1][0].type).toBe('SET_ERROR')
        expect(mockDispatch.mock.calls[1][0].payload).toBe(ERROR_MESSAGE)
    })
})
