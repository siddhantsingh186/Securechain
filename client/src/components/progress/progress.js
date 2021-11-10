import React, {useEffect, useState} from 'react'
import axios from 'axios';
import "./progress.scss"
const Progress = ({getBatchIdsInOwnership , getProductHistory}) => {

    const [supplyChainId, setsupplyChainId] = useState("");
    const [productNumber, setProductNumber] = useState("");
    const [batchId, setBatchId] = useState("");
    const [displayTrack, setDisplayTrack] = useState([]);

    const handleSubmit = () => {
        console.log("hello")
        if(batchId !== ""){
            getProductHistory(parseInt(supplyChainId), productNumber, parseInt(batchId)).then((res)=>{
                setDisplayTrack(res);
            });
            console.log(displayTrack);
        }
    }
    useEffect(()=>{
        console.log(supplyChainId);
    },[supplyChainId])

    useEffect(()=>{
        console.log(productNumber);  
    },[productNumber])

    useEffect(()=>{
        console.log(batchId)
    },[batchId])
    return (
    <div className = "progress">
        <h1 className ="progress__head">Progress</h1>
        <div className = "track">
            <div className = "track__big-card">
                <div className = "track__row">
                    <form className="track__column" >
                        <div className="track__form-grp">
                            <label className="track__label">Product Number : </label>
                            <input type="text" 
                            className = "track__input"
                                placeholder="Enter Product number" 
                                onChange = {e => setProductNumber(e.target.value)}
                            />
                        </div>
                        <div className="track__form-grp">
                            <label className="track__label">Enter Supply Chain : </label>
                            <input type="text" 
                            className = "track__input"
                                placeholder="Enter Supply Chain Id" 
                                onChange = {e => setsupplyChainId(e.target.value)}
                            /> 
                        </div>
                        <div className="track__form-grp">
                            <label className="track__label">Batch id : </label>
                            <input type="text" 
                            className = "track__input"
                                placeholder="Enter Batch Id" 
                                onChange = {e => setBatchId(e.target.value)}
                            />
                        </div>
                        <button className = "track__button"  onClick={handleSubmit}>Submit</button>
                    </form>
                    <div className = "track__column">
                        {displayTrack && displayTrack.map((e)=>{
                            return(
                                <div className = "progress__bottom" key ={e.timestamp}>
                                    <div className = "progress__left">{e.timestamp}</div>
                                    <div className = "progress__right">{e.ownerName}</div>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </div>
        </div>
    </div>
    )
}

export default Progress
