import React from 'react'

export default function LevelInput(props: { level: number; onChange: React.Dispatch<any> }) {
    return (
        <>
            <label htmlFor="level">Encounter Level</label>
            <input id="level" className="form-control" type="number" aria-describedby="levelHelp" value={props.level} min="2" max="70" onChange={e => props.onChange(parseInt(e.target.value))}></input>
            <small id="levelHelp" className="form-text text-muted">The level of the Pokemon you want to catch 2-70</small>
        </>
    )
}
