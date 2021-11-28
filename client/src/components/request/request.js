import React from 'react';
import './request.scss';
import axios from 'axios';
import { useEffect, useState } from 'react';
import Web3 from 'web3';
import { useHistory } from 'react-router';


const Request = ({getNotificationsOfUser ,acceptTransfer}) => {
    const [notifications, setNotifications] = useState([])
    const [notificationLoaded, setNotificationLoaded] = useState(false)

    useEffect(() => {
        getNotificationsOfUser().then((res) => {
            console.log(res)
            let allNotifications = [];
            res.forEach(d => {
                const notification = {
                    "notiType" : d[0],
                    "notiId" : d[1],
                    "timeStamp" : d[2],
                    "senderAddress" : d[3],
                    "senderName" : d[4],
                    "receiverAddress" : d[5],
                    "receiverName" : d[6],
                    "productNo" : d[7],
                    "productName" : d[7].split("_")[0],
                    "supplychainId" : d[9],
                    "batchesToTransfer" : d[10],
                    "unitsPerBatch" : d[11],
                    "firstBatch" : d[12],
                    "lastBatch" : d[13],
                    "exists" : d[14]
                }
                console.log(notification);
                console.log("here notifications", notifications);
                allNotifications = [...allNotifications, notification]
            });
            setNotifications(allNotifications);
            setNotificationLoaded(true);
        })
    }, [])

    useEffect(() => {
        console.log(notifications)
    }, [notifications])

    const submitHandler = (notificationId) => {
        let today = new Date();
        let date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
        let time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
        let timestamp = date + '_' + time;
        acceptTransfer(notificationId, timestamp);
    }

    return(
        <div className="createsupply__bottom">
            <h1 className = "createsupply__bottom__head">Notifications</h1>
            <div className = "request">
                {notifications && notifications.map((d)=>{ 
                        return(
                                d.exists &&
                                <div className="request__row">
                                    <div className = "request__big-card">
                                        <div className="request__title">
                                            <p>{d.senderName} wants to send you {d.batchesToTransfer} batches of vials!</p>
                                        </div>
                                        <div className="request__content">
                                            <p className="request__key"><strong className="request__key__bold">Sender's Name : </strong>{d.senderName}</p>
                                            <p className="request__key"><strong className="request__key__bold">Supply Chain : </strong>{d.supplychainId}</p>
                                            <p className="request__key"><strong className="request__key__bold">Product Name : </strong>{d.productName}</p>
                                            <p className="request__key"><strong className="request__key__bold">Number of batches : </strong>{d.batchesToTransfer}</p>
                                            <p className="request__key"><strong className="request__key__bold">Number of units per batch : </strong>{d.unitsPerBatch}</p>
                                            <p className="request__key"><strong className="request__key__bold">Transaction Date : </strong>{d.timeStamp}</p>
                                        </div>
                                        <div className="request__row">
                                            <div className="request__column">
                                                <button className="request__button__accept" type="submit" onClick={() => submitHandler(d.notiId)}>Accept</button>
                                            </div>
                                            
                                            {/* <div className="request__column">
                                                <button className="request__button__decline" type="submit" >Decline</button>
                                            </div> */}
                                        </div>
                                    </div> 
                                </div>
                            )
                        }
                    )
                }
            </div>
        </div>
    )
}    
export default Request
