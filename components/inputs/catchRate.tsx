import React from 'react'

export default function CatchRateInput(props: { isHex: boolean; catchRate: number; onChange: React.Dispatch<any> }) {
    return (
        <>
            <label htmlFor="catchRate">Encounter Catch Rate</label>
            <input id="catchRate" className="form-control" type={props.isHex ? "text" : "number"} aria-describedby="catchRateHelp"
                value={props.isHex ? props.catchRate.toString(16) : props.catchRate}
                onChange={e => props.onChange(parseInt((props.isHex ? "0x" : "") + e.target.value))}>
            </input>
            <small id="catchRateHelp" className="form-text text-muted">The Catch Rate of the Pokemon</small>
        </>
    )
}
