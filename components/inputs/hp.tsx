import React from 'react'

export default function HPInput(props: { currentHPPercent: number; onChange: React.Dispatch<any> }) {
    return (
        <>
            <label htmlFor="hpRange">% of Max HP</label>
            <input id="hpRange" className="form-range" type="range" min="1" max="100" value={props.currentHPPercent} onChange={e => props.onChange(parseInt(e.target.value))}></input>
        </>
    )
}
