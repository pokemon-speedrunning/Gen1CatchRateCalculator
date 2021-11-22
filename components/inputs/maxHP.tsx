import React from 'react'

export default function MaxHPInput(props: { isHex: boolean; maxHP: number; onChange: React.Dispatch<any> }) {
    return (
        <>
            <label htmlFor="maxHP">Encounter Max HP</label>
            <input id="maxHP" className="form-control" type={props.isHex ? "text" : "number"} aria-describedby="maxHPHelp"
                value={props.isHex ? props.maxHP.toString(16) : props.maxHP}
                onChange={e => props.onChange(parseInt((props.isHex ? "0x" : "") + e.target.value))}>
            </input>
            <small id="maxHPHelp" className="form-text text-muted">The Max HP of the Pokemon</small>
        </>
    )
}
