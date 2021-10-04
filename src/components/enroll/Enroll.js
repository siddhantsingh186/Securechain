import axios from 'axios';
import React, {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import TextField from '@mui/material/TextField';
import './Enroll.scss';

const Enroll = ({selectedSupplyChain}) => {
    let token = localStorage.getItem("token");
    let supplyChain = localStorage.getItem("supplychain");
    //let index = -1;
    let entityName = "";
    //const inputField = []; 
    const [supplyChainName, setSupplyChain] = useState(supplyChain.name)
    const [owner, setOwner] = useState(supplyChain.owner);
    const [entities, setEntities] = useState([]);
    const [entityData, setEntityData] = useState([]);
    const [entityId, setEntityId] = useState();
    const [instance, setInstance] = useState({});
    const [inputField, setInputField] = useState([{data: '', generic_attribute: uuidv4()}]);

    const handleChange = (e, id) => {
        setInputField(currentInputField =>
            currentInputField.map(field => 
                field.generic_attribute === id 
                ? {
                    ...field,
                    data: e.target.value
                }
                : field
            )
        )
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        entityName = entityData.entity_name;
        let data = {
            generic_attribute_data: inputField,
            name: entityName,
            entity: entityId
        }
        console.log(data)
        axios
            .post("https://securechain-backend.herokuapp.com/instance/", data,
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
    /*const retrieveEntity = () => {
        axios
            .get("https://securechain-backend.herokuapp.com/entity/",
            {
                header: {
                    Authorization: `Token ${token}`
                }
            },
            {
                params: {
                    supply_chain: supplyChain.id
                }
            }
            )
            .then((res) => {
                if(res){
                    console.log("tt")
                    setEntities(res)
                }
            })
            .catch((err) => {
                console.log(err)
            })

    }*/

    /*const retrieveEntityData = () => {
        axios
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

    }*/
    

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
            /*{
                params: {
                    supply_chain: supplyChain.id
                }
            }*/
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
    return (
        <>
            <article className="container">
                <div className="head">
                    <h2>Enroll in Supply Chain</h2>
                </div>
                <form className="form" onSubmit={handleSubmit}>
                    <div className="form-control">
                        
                        <div className="field">
                            <select
                                name="role"
                                label="Role"
                                id="entityId"
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
                        {entityData.generic_attributes && entityData.generic_attributes.map((att) => {
                            //console.log(att)
                            index++;
                            return(
                                <div className="field" key={att.id}>
                                    <TextField
                                        name={att.name}
                                        label={att.name}
                                        variant="filled"
                                        placeholder={att.name}
                                        onChange={(e) => {
                                            handleChange(e, att.id);
                                        }}
                                    />
                                </div>
                            );
                        })}
                    </div>
                    <br/><br/>
                    <div className="btn-css">
                        <button type="submit" className='btn'>Request Participation</button>
                    </div>
                </form>  
            </article>
        </>
    )

}
export default Enroll;
