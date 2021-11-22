import React from 'react'
// @ts-ignore
import pokedex from '../../lib/pokedex.json'

export default function SpeciesSelect(props: { onChange: React.Dispatch<any> }) {
    return (
        <>
            <label htmlFor="species">Encounter Species</label>
            <select id="species" className="form-control" aria-describedby="speciesHelp" style={{textTransform: "capitalize"}} onChange={e => props.onChange(pokedex[e.target.value])}>
                {Object.keys(pokedex).map(pokemon => <option key={pokemon} value={pokemon}>{pokedex[pokemon].name.toLowerCase()}</option>)}
            </select>
            <small id="speciesHelp" className="form-text text-muted">Which pokemon you're encountering</small>
        </>
    )
}
