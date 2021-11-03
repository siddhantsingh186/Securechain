import axios from 'axios';
import React, {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import TextField from '@mui/material/TextField';
import { produce } from "immer";
import './Enroll.scss';

const Enroll = ({selectedSupplyChain}) => {
    let token = localStorage.getItem("token");
    let supplyChain = localStorage.getItem("supplychain");
    let entityName = "";
    //const inputField = [{data: '', generic_attribute: uuidv4()}]; 
    const [supplyChainName, setSupplyChain] = useState(supplyChain.name)
    const [owner, setOwner] = useState(supplyChain.owner);
    const [entities, setEntities] = useState([]);
    const [entityData, setEntityData] = useState([]);
    const [entityId, setEntityId] = useState();
    const [instance, setInstance] = useState({});
    const [inputField, setInputField] = useState({});
    const [personalSupplyChains, setPersonalSupplyChains] = useState();
    const [personalSupplyChain, setPersonalSupplyChain] = useState();
    const [personalEntities, setPersonalEntities] = useState();
    const [personalEntity, setPersonalEntity] = useState();

    //const [data, setData] = useState([])

    const handleInput = (e, id, index) => {
        e.preventDefault();
        setInputField({...inputField, [id]: e.target.value});
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        let entityName = entityData.entity_name;
        let finalData = [];
        Object.entries(inputField).map(([key, value]) => {
                        return(
                            finalData.push({data: value, generic_attribute: key})
                        )
                    })
        let sendData = {
            generic_attribute_data: finalData,
            name: entityName,
            entity: entityId,
            connected_supply_chain: personalSupplyChain,
            connecting_entity: personalEntity
        }
        console.log(finalData)
        console.log(inputField)
        axios
            .post("https://securechain-backend.herokuapp.com/instance/", sendData,
            {
                headers: {
                    Authorization: `Token ${token}`
                }
            })
            .then((res) => {
                console.log('api response', res)
            })
            .catch((err) => {
                console.log(err.response)
            })
    }

    useEffect(() => {
       // retrieveEntity();
       console.log(supplyChain);
       axios
            .get(`https://securechain-backend.herokuapp.com/entity/?supply_chain=${supplyChain}`,
            {
                headers: {
                    Authorization: `Token ${token}`
                }
            }
            )
            .then((res) => {
                if(res){
                    setEntities(res.data)
                }
            })
            .catch((err) => {
                console.log(err)
            })

        console.log(entities);

    }, []);

    useEffect(() => {
        console.log(entityId);
        console.log("uuu");
        entityId > 0 && axios
            .get(`https://securechain-backend.herokuapp.com/entity/${entityId}/`,
            {
                headers: {
                    Authorization: `Token ${token}`
                }
            })
            .then((res) => {
                if(res){
                    setEntityData(res.data)
                }
            })
            .catch((err) => {
                console.log(err)
            })
    }, [entityId]);

    useEffect(() => {
       axios
            .get('https://securechain-backend.herokuapp.com/mysupplychain/',
            {
                headers: {
                    Authorization: `Token ${token}`
                }
            }
            )
            .then((res) => {
                if(res){
                    setPersonalSupplyChains(res.data)
                }
            })
            .catch((err) => {
                console.log(err)
            })

        console.log(personalSupplyChains);

    }, [entityId]);

    useEffect(() => {
       // retrieveEntity();
       axios
            .get(`https://securechain-backend.herokuapp.com/entity/?supply_chain=${personalSupplyChain}`,
            {
                headers: {
                    Authorization: `Token ${token}`
                }
            }
            )
            .then((res) => {
                if(res){
                    setPersonalEntities(res.data)
                }
            })
            .catch((err) => {
                console.log(err)
            })

        console.log(personalEntities);

    }, [personalSupplyChain]);

    return (
        <>
        <div className="createsupply__bottom">
            <h1 className = "createsupply__bottom__head">Create Supply Chain</h1>
            <div className = "enroll">
                <div className="enroll__big-card">
                    <article>
                    <div className="enroll__row">
                        <div className="enroll__column">
                            <h1 className="enroll__title">Enroll in Supply Chain</h1>
                            
                            <form onSubmit={handleSubmit}>
                                <div className="enroll__form-group">
                                        <label className="enroll__label">Select Role</label><br></br>
                                        <select
                                            name="role"
                                            label="Role"
                                            id="entityId"
                                            className="enroll__input"
                                            onChange={(e) => {
                                                setEntityId(e.target.value);
                                            }}
                                        >
                                            <option value="Choose">
                                                Choose
                                            </option>
                                            
                                            {entities.map((entity) => {
                                                return(
                                                    <option key={entity.id} value={entity.id}>
                                                        {entity.entity_name}        
                                                    </option>
                                                );
                                            })}
                                        </select>
                                </div>
                                {entityData.generic_attributes && entityData.generic_attributes.map((att, index) => {
                                    //console.log(att)
                                    return(
                                        <div className="enroll__formgroup" key={att.id}>
                                            <TextField
                                                name={att.name}
                                                label={att.name}
                                                variant="filled"
                                                className="enroll__input"
                                                placeholder={att.name}
                                                onChange={(e) => {
                                                    handleInput(e, att.id, index);
                                                }}
                                            />
                                        </div>
                                    );
                                })}
                                
                                <div className="enroll__form-group">
                                        <label className="enroll__label">Select your supply chain to connect</label><br></br>
                                        <select
                                            name="personalSupplyChain"
                                            label="personalSupplyChain"
                                            className="enroll__input"
                                            id="personalSupplyChain"
                                            onChange={(e) => {
                                                setPersonalSupplyChain(e.target.value);
                                            }}
                                        >
                                            <option value="Choose">
                                                Choose
                                            </option>
                                            {personalSupplyChains && personalSupplyChains.map((personalSC) => {
                                                return(
                                                    <option key={personalSC.id} value={personalSC.id}>
                                                        {personalSC.name}       
                                                    </option>
                                                );
                                            })}
                                        </select>
                                </div>
                                
                                <div className="enroll__form-group">
                                    <label className="enroll__label">Select the entity to be connected</label><br></br>
                                    <select
                                        name="personalEntity"
                                        label="personalEntity"
                                        id="personalEntity"
                                        className="enroll__input"
                                        onChange={(e) => {
                                            setPersonalEntity(e.target.value);
                                        }}
                                    >
                                        <option value="Choose">
                                            Choose
                                        </option>
                                        
                                        {personalEntities && personalEntities.map((personalE) => {
                                            return(
                                                <option key={personalE.id} value={personalE.id}>
                                                    {personalE.entity_name}       
                                                </option>
                                            );
                                        })}
                                    </select>                        
                                </div>
                                <button className="enroll__button" type="submit">Request Participation</button>
                            </form>  
                        </div>
                    </div>
                    </article>
                </div>
            </div>
        </div>
        </>
    )

}
export default Enroll;
