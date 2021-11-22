import React from 'react'

export default function Progress(props: { progressName: string; progressBarID: string; progressValue: number}) {
    return (
        <>
            
            <p>{props.progressName}</p>
            <p>{props.progressValue}%</p>
            <div className="progress">
                <div className="progress-bar" id={props.progressBarID} role="progressbar" style={{width: `${props.progressValue}%`,}} aria-valuenow={props.progressValue} aria-valuemin={0} aria-valuemax={100}></div>
            </div>
        </>
    )
}
