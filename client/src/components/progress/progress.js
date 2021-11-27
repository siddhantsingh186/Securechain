import React, {useEffect, useState} from 'react'
import axios from 'axios';
import "./progress.scss"
const Progress = ({getBatchIdsInOwnership , getProductHistory}) => {

    const [supplyChainId, setsupplyChainId] = useState("");
    const [productNumber, setProductNumber] = useState("");
    const [batchId, setBatchId] = useState("");
    const [displayTrack, setDisplayTrack] = useState([]);
    const [tracksuccess, setTrackSuccess] = useState(false);

    const handleSubmit = (e) => {
        setTrackSuccess(true);
        e.preventDefault();
        console.log("hello")
        if(batchId !== ""){
            getProductHistory(parseInt(supplyChainId), productNumber, parseInt(batchId)).then((res)=>{
                setDisplayTrack(res);
            });
            console.log(displayTrack);
        }
    }
    return (
    <div className = "progress">
        <h1 className ="progress__head">Progress</h1>
        <div className = {tracksuccess?"track1":"track"}>
            <div className = {tracksuccess?"track1__big-card":"track__big-card"}>
                <div className = {tracksuccess?"track1__row":"track__row"}>
                    <form className={tracksuccess?"track1__column":"track__column"} onSubmit={handleSubmit}>
                        <div className={tracksuccess?"track1__form-grp":"track__form-grp"}>
                            <label className={tracksuccess?"track1__label":"track__label"}>Product Number : </label>
                            <input type="text" 
                            className = {tracksuccess?"track1__input":"track__input"}
                                placeholder="Enter Product number" 
                                onChange = {e => setProductNumber(e.target.value)}
                            />
                        </div>
                        <div className={tracksuccess?"track1__form-grp":"track__form-grp"}>
                            <label className={tracksuccess?"track1__label":"track__label"}>Enter Supply Chain : </label>
                            <input type="text" 
                            className = {tracksuccess?"track1__input":"track__input"}
                                placeholder="Enter Supply Chain Id" 
                                onChange = {e => setsupplyChainId(e.target.value)}
                            /> 
                        </div>
                        <div className={tracksuccess?"track1__form-grp":"track__form-grp"}>
                            <label className={tracksuccess?"track1__label":"track__label"}>Batch id : </label>
                            <input type="text" 
                            className = {tracksuccess?"track1__input":"track__input"}
                                placeholder="Enter Batch Id" 
                                onChange = {e => setBatchId(e.target.value)}
                            />
                        </div>
                        <button className = {tracksuccess?"track1__button":"track__button"}  type="submit">Submit</button>
                    </form>
                </div>
            </div>
            {displayTrack &&
            <div className = "track__column">
                          {displayTrack.map((e)=>{
                            let block;
                            if(e.description === "Transfer Requested")
                            {
                                block = e.description + " by " + e._senderName + " to " + e._receiverName; 
                            }
                            else if(e.description === "Product Created")
                            {
                                block = e.description + " by " + e._senderName;
                            }
                            else if(e.description === "Transfer Request Accepted")
                            {
                                block = e.description + " by " + e._receiverName;
                            }
                            else
                            {
                                block = e.description + " to " + e._receiverName;
                            }
                            return(
                                <div className = "progress__bottom" key ={e.timestamp}>
                                    <div className = "progress__left">{e.timestamp}</div>
                                    <div className = "progress__right">{block}</div>
                                </div>
                            )
                        })}
            </div>
            }
        </div>
    </div>
    )
}

export default Progress
