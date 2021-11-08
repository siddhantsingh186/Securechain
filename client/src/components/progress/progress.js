import React, {useEffect, useState} from 'react'
import "./progress.scss"
const Progress = ({getBatchIdsInOwnership , getProductHistory}) => {
    const [batchId, setBatchId] = useState("");
    const [productId, setProductId] = useState("");
    useEffect(()=>{
        
    },[])
    return (
    <div className = "progress">
        <div className ="progress__head">
            <p>Progress</p>
        </div>
        <input type="" placeholder="Enter Product id" onChange = {e => setProductId(e.target.value)}/>
        <input type="" placeholder="Enter Batch id" onChange = {e => setBatchId(e.target.value)}/>
        <div className = "progress__bottom">
            <div className = "progress__left">Time</div>
            <div className = "progress__right">Status</div>
        </div>
    </div>
    )
}

export default Progress
