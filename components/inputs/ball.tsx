import React from 'react'
// @ts-ignore
import pokeBalls from '../../lib/pokeballs.json'

export default function BallSelect(props: { onChange: React.Dispatch<any> }) {
    return (
        <>
            <label htmlFor="ball">Poke Ball Type</label>
            <select id="ball" className="form-control" aria-describedby="ballHelp"
                onChange={e => props.onChange(JSON.parse(e.target.value))}>
                {Object.keys(pokeBalls).map(ballType =>
                    <option key={ballType} value={JSON.stringify(pokeBalls[ballType])}>{pokeBalls[ballType].ballName}</option>
                )}
            </select>
            <small id="ballHelp" className="form-text text-muted">The poke ball you want to use</small>
        </>
    )
}
