import React from 'react'

export default function AdvancedInput(props: { name: string; label: string; helpText: string; isHex: boolean; value: number; onChange: React.Dispatch<any> }) {
    return (
        <>
            <label htmlFor={props.name}>{props.label}</label>
            <input id={props.name} className="form-control" type={props.isHex ? "text" : "number"} aria-describedby={`${props.name}Help`}
                value={props.isHex ? props.value.toString(16) : props.value}
                onChange={e => props.onChange(parseInt((props.isHex ? "0x" : "") + e.target.value))}>
            </input>
            <small id={`${props.name}Help`} className="form-text text-muted">{props.helpText}</small>
        </>
    )
}
