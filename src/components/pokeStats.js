import React from 'react'
import { Table } from 'react-bootstrap'

export function PokeStats(props) {
    return (
        <>
            <h3>Stats</h3>
            <Table>
                <tbody>
                    <tr>
                        <th>Name</th>
                        <th>Base Stat</th>
                    </tr>
                    <tr>
                        <td>Speed</td>
                        <td>{props.pokemon.stats[0].base_stat}</td>
                    </tr>
                    <tr>
                        <td>Special Defense</td>
                        <td>{props.pokemon.stats[1].base_stat}</td>
                    </tr>
                    <tr>
                        <td>Special Attack</td>
                        <td>{props.pokemon.stats[2].base_stat}</td>
                    </tr>
                    <tr>
                        <td>Defense</td>
                        <td>{props.pokemon.stats[3].base_stat}</td>
                    </tr>
                    <tr>
                        <td>Attack</td>
                        <td>{props.pokemon.stats[4].base_stat}</td>
                    </tr>
                </tbody>
            </Table>
        </>
    )
}
