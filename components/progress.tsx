import React from 'react'

export default function Progress(props: { progressName: string; progressBarID: string; progressValue: number}) {
    return (
        <>
            <p className="mb-1">{props.progressName}</p>
            <p className="mb-1">{props.progressValue}%</p>
            <div className="progress">
                <div className="progress-bar" id={props.progressBarID} role="progressbar" style={{width: `${props.progressValue}%`,}} aria-valuenow={props.progressValue} aria-valuemin={0} aria-valuemax={100}></div>
            </div>
        </>
    )
}
