import React from 'react'

const PokemonStateContext = React.createContext()
const PokemonDispatchContext = React.createContext()

const initialState = {
    pokemon: {},
    pokemonDescription: '',
    error: null
}

const reducer = (state, action) => {
    switch (action.type) {
        case 'SET_POKEMON': {
            return { ...state, pokemon: action.payload }
        }
        case 'SET_FLAVOR_TEXT': {
            return { ...state, pokemonDescription: action.payload }
        }
        case 'SET_ERROR': {
            return { ...state, pokemon: {}, error: action.payload}
        }
        default: {
            throw new Error(`Unhandled action type: ${action.type}`)
        }
    }
}

function PokemonProvider({children}) {
    const [state, dispatch] = React.useReducer(reducer, initialState)

    return (
        <PokemonStateContext.Provider value={state}>
            <PokemonDispatchContext.Provider value={dispatch}>
                {children}
            </PokemonDispatchContext.Provider>
        </PokemonStateContext.Provider>
    )
}

function usePokemonState() {
    const context = React.useContext(PokemonStateContext)
    if (context === undefined) {
        throw new Error('usePokemonState must be used within a PokemonProvider')
    }
    return context
}

function usePokemonDispatch() {
    const context = React.useContext(PokemonDispatchContext)
    if (context === undefined) {
        throw new Error('usePokemonDispatch must be used within a PokemonProvider')
    }
    return context
}

export { PokemonProvider, usePokemonState, usePokemonDispatch }
