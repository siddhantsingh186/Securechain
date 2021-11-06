import React from 'react'
import "./progress.scss"
function Progress () {
    return (
    <div className = "progress">
        <div className ="progress__head">
            <p>Progress</p>
        </div>
        <div className = "progress__bottom">
            <div className = "progress__left">Time</div>
            <div className = "progress__right">Status</div>
        </div>
    </div>
    )
}

export default Progress
