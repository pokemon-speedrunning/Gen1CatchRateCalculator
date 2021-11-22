import React from 'react'

export default function GameSelect(props: { onChange: React.Dispatch<any> }) {
    return (
        <>
            <label htmlFor="game">Game</label>
            <select id="game" className="form-control" aria-describedby="gameHelp" onChange={e => props.onChange(e.target.value)}>
                <option key="RB" value="RB">Red/Blue</option>
                <option key="Y" value="Y">Yellow</option>
            </select>
            <small id="gameHelp" className="form-text text-muted"> The game you're playing</small>
        </>
    )
}
