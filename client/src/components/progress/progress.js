import React, {useEffect, useState} from 'react'
import "./progress.scss"
const Progress = ({getBatchIdsInOwnership , getProductHistory}) => {
    const [supplyChainId, setsupplyChainId] = useState("");
    const [productNumber, setProductNumber] = useState("");
    const [batchId, setBatchId] = useState("");
    const [displayTrack, setDisplayTrack] = useState([]);
    const handleSubmit = () => {
        if(batchId !== ""){
            getProductHistory(parseInt(supplyChainId), productNumber, parseInt(batchId)).then((res)=>{
                setDisplayTrack(res);
            });
            console.log(displayTrack);
        }
    }
    return (
    <div className = "progress">
        <div className ="progress__head">
            <p>Progress</p>
        </div>
        <input type="" placeholder="Enter Product number" onChange = {e => setProductNumber(e.target.value)}/>
        <input type="" placeholder="Enter Supply Chain id" onChange = {e => setsupplyChainId(e.target.value)}/>
        <input type="" placeholder="Enter Batch id" onChange = {e => setBatchId(e.target.value)}/>
        <button onClick = {handleSubmit}>Submit</button>
            {displayTrack && displayTrack.map((e)=>{
                return(
                    <div className = "progress__bottom" key ={e.timestamp}>
                        <div className = "progress__left">{e.timestamp}</div>
                        <div className = "progress__right">{e.ownerName}</div>
                    </div>
                )
            })}
        </div>
    )
}

export default Progress
