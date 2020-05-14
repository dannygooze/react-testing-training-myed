import React from 'react'
import { Row, Col, Container } from 'react-bootstrap'
import { PokeStats } from './pokeStats'

export function PokeDetailTable(props) {
    const formatPokeId = (id) => {
        const idLength = String(id).length
        let bufferZeroes

        if (idLength === 2) {
            bufferZeroes = '0'
        } else if (idLength === 1) {
            bufferZeroes = '00'
        } else {
            bufferZeroes = ''
        }

        return `${bufferZeroes}${id}`
    }

    return (
        <div>
            <Container>
                <Row>
                    <Col>
                        <h2>{props.pokemon.name.charAt(0).toUpperCase() + props.pokemon.name.slice(1)}</h2>
                        {props.description ? <p>{props.description}</p> : null}
                        <PokeStats pokemon={props.pokemon} />
                    </Col>
                    <Col>
                        <img src={`https://assets.pokemon.com/assets/cms2/img/pokedex/full/${formatPokeId(props.pokemon.id)}.png`} alt={props.pokemon.name}/>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}
