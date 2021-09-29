import axios from 'axios';
import React, {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import './Enroll.scss';

const Enroll = ({selectedSupplyChain}) => {
    let token = localStorage.getItem("token");
    let supplyChain = localStorage.getItem("supplychain");
    const [instance, setInstance] = useState({});
    const [supplyChainName, setSupplyChain] = useState(supplyChain.name)
    const [owner, setOwner] = useState(supplyChain.owner);
    const [entities, setEntities] = useState([]);
    const [entityData, setEntityData] = useState([]);
    const [role, setRole] = useState({});

    const handleSubmit = (e) => {
        e.preventDefault();
        
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

    const retrieveEntityData = () => {
        axios
            .get(`https://securechain-backend.herokuapp.com/entity/${role.id}/`,
            {
                headers: {
                    Authorization: `Token ${token}`
                }
            })
            .then((res) => {
                if(res){
                    setEntityData(res)
                }
            })
            .catch((err) => {
                console.log(err)
            })

    }

    useEffect(() => {
       // retrieveEntity();
       axios
            .get("https://securechain-backend.herokuapp.com/entity/",
            {
                headers: {
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
                    setEntities(res.data)
                }
            })
            .catch((err) => {
                console.log(err)
            })

        console.log(entities);
        //retrieveEntityData();

    }, []);

    useEffect(() => {
        console.log(entities);

    }, [entities])
    return (
        <>
            <article className="container">
                <div className="head">
                    <h2>Enroll in Supply Chain</h2>
                </div>
                <form className="form" onSubmit={handleSubmit}>
                    <div className="form-control">
                        
                        <div className="field">
                            <label htmlFor="role" className="lab">
                                Role
                            </label>
                            <select
                                name="role"
                                id="role"
                                onChange={(e) => {
                                    setRole(e.target.value);
                                    retrieveEntityData();
                                }}
                            >
                                <option value="Choose">
                                    Choose
                                </option>
                                
                                {entities.map((entity) => {
                                    return(
                                        <option key= {entity.id} value={entity.id}>
                                            {entity.entity_name}        
                                        </option>
                                    );
                                })}
                            </select>
                            
                        </div>
                        {/*entityData && entityData.generic_attributes.map((att) => {
                            return(
                                <div className="field">
                                    <label htmlFor="company" className="lab">
                                        {att.name}
                                    </label>
                                    <input
                                        type="text"
                                        id={att.id}
                                        name={att.name}
                                        placeholder={att.name}
                                        onChange={(e) => setInstance(...instance, att.name=e.target.value)}
                                    />
                                </div>
                            );
                        })*/}
                    </div>
                    <br/><br/>
                    <div className="btn-css">
                        <button type="submit" className='btn'><Link to='/selectSupplyChain/enroll/dashboard'>Request Participation</Link></button>
                    </div>
                </form>  
            </article>
        </>
    )

}
export default Enroll;
