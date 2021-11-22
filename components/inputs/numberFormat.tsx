import React from 'react'

export default function NumberFormat(props: { isHex: boolean; onChange: React.Dispatch<any> }) {
    return (
        <>
            <label htmlFor="numberFormat">Number Format</label>
            <select id="numberFormat" className="form-control" aria-describedby="numberFormatHelp"
                onChange={e => props.onChange(e.target.value === "hex" ? true : false)}>
                <option key="hex" value="hex">Hex</option>
                <option key="decimal" value="decimal">Decimal</option>
            </select>
            <small id="numberFormatHelp" className="form-text text-muted">Whether to parse inputs as hex 0x (your input) or decimal</small>
        </>
    )
}
