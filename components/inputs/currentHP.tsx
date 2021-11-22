import React from 'react'

export default function CurrentHPInput(props: { isHex: boolean; currentHP: number; onChange: React.Dispatch<any> }) {
    return (
        <>
            <label htmlFor="currentHP">Encounter Current HP</label>
            <input id="currentHP" className="form-control" type={props.isHex ? "text" : "number"} aria-describedby="currentHPHelp"
                value={props.isHex ? props.currentHP.toString(16) : props.currentHP}
                onChange={e => props.onChange(parseInt((props.isHex ? "0x" : "") + e.target.value))}>
            </input>
            <small id="catchRateHelp" className="form-text text-muted">The Current HP of the Pokemon</small>
        </>
    )
}
