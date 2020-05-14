import React from 'react'
import { NotFound } from './notFound'
import { PokeDetailTable } from './pokeDetailTable'
import { usePokemonState } from '../context'

export function PokeDetail(props) {
    const {state,} = usePokemonState()

    return (
        <div className='mt-3'>
            {state.error ? <NotFound /> : null}
            {state.pokemon.name ? <PokeDetailTable pokemon={state.pokemon} description={state.pokemonDescription} /> : null}
        </div>
    )
}
