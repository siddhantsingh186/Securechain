import React from 'react';
import './request.scss';
import axios from 'axios';
import { useEffect, useState } from 'react';
import Web3 from 'web3';
import { useHistory } from 'react-router';


const Request = ({getNotificationsOfUser ,acceptTransfer}) => {
    const [notifications, setNotifications] = useState([{}])
    const [notificationLoaded, setNotificationLoaded] = useState(false)

    useEffect(() => {
        getNotificationsOfUser().then((res) => {
            console.log(res)
            res.forEach(d => {
                setNotifications([...notifications, 
                    {
                        "notiType" : d[0],
                        "notiId" : d[1],
                        "timeStamp" : d[2],
                        "senderAddress" : d[3],
                        "senderName" : d[4],
                        "receiverAddress" : d[5],
                        "receiverName" : d[6],
                        "productNo" : d[7],
                        "productName" : d[8],
                        "supplychainId" : d[9],
                        "batchesToTransfer" : d[10],
                        "firstBatch" : d[11],
                        "lastBatch" : d[12],
                        "exists" : d[13]
                }])
            });
            console.log(notifications)
            setNotificationLoaded(true)
        })
    }, [])
    return(
        <div className="createsupply__bottom">
            <h1 className = "createsupply__bottom__head">Create Product</h1>
            <div className = "request">
                {notifications && notifications.map((d)=>{
                        
                        return(
                                <div className="request__row">
                                <div className = "request__big-card">
                                    <div className="request__title">
                                        <p>Krishna Transporters wants to send you 20 batches of vials!</p>
                                    </div>
                                    <div className="request__content">
                                        <p className="request__key"><strong className="request__key__bold">Sender's Name : </strong>{d.senderName}</p>
                                        <p className="request__key"><strong className="request__key__bold">Supply Chain : </strong></p>
                                        <p className="request__key"><strong className="request__key__bold">Product Name : </strong>Vials</p>
                                        <p className="request__key"><strong className="request__key__bold">Number of batches : </strong>100</p>
                                        <p className="request__key"><strong className="request__key__bold">Number of uints in one batch : </strong>1000</p>
                                        <p className="request__key"><strong className="request__key__bold">Transaction Date : </strong>19/11/2021</p>
                                    </div>
                                    <div className="request__row">
                                        <div className="request__column">
                                            <button className="request__button__accept" type="submit" >Accept</button>
                                        </div>
                                        
                                        <div className="request__column">
                                            <button className="request__button__decline" type="submit" >Decline</button>
                                        </div>
                                    </div>
                                </div> 
                            </div>
                        )
                    }
                )}
            </div>
        </div>
    )
}    
export default Request
