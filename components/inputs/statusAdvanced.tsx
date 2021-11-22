import React from 'react'

export default function StatusInput(props: { isHex: boolean; status: number; onChange: React.Dispatch<any> }) {
    return (
        <>
            <label htmlFor="status">Status Effect</label>
            <input id="status" className="form-control" type={props.isHex ? "text" : "number"} aria-describedby="statusHelp"
                value={props.isHex ? props.status.toString(16) : props.status}
                onChange={e => props.onChange(parseInt((props.isHex ? "0x" : "") + e.target.value))}>
            </input>
            <small id="statusHelp" className="form-text text-muted">Status effect modifier value if any</small>
        </>
    )
}
