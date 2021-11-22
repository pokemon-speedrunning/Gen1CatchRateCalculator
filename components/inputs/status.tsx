import React from 'react'
// @ts-ignore
import statusEffects from '../../lib/statuseffects.json'

export default function StatusSelect(props: { onChange: React.Dispatch<any> }) {
    return (
        <>
            <label htmlFor="status">Status Effect</label>
            <select id="status" className="form-control" aria-describedby="statusHelp" style={{textTransform: "capitalize"}} onChange={e => props.onChange(e.target.value)}>
                {Object.keys(statusEffects).map(status => <option key={status} value={statusEffects[status]}>{status}</option>)}
            </select>
            <small id="statusHelp" className="form-text text-muted">Status effect if any</small>
        </>
    )
}
