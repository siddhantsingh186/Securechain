import React , { useState, useEffect }from 'react';
import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import IconButton from '@mui/material/IconButton';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import RemoveCircleRoundedIcon from '@mui/icons-material/RemoveCircleRounded';
import Button from '@mui/material/Button';
import { useHistory } from 'react-router';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import { v4 as uuidv4 } from 'uuid';
// import Select from 'react-select';
import { Link } from 'react-router-dom'
import axios from 'axios';
import "./createsupplyflow.scss";

const Createsupplyflow = () => {
    const [entity,setEntity] = useState({
        options:[],
        value:'',
        id:''
    });
    useEffect(() => {
        let token = localStorage.getItem("token")
        axios.get("http://securechain-backend.herokuapp.com/entity/",{
            headers: {
                Authorization: `Token ${token}`,
            }
        }).then((res) => {
            console.log('api response 🚀', res)
            setEntity({
                options:res.data.map(d => ({
                    "value" : d.id,
                    "label" : d.entity_name
                  }))
            })
        })
        .catch((error) => {
            console.error(error.response)
        });
    },[]);
    console.log(entity.options)
    console.log(entity);
    // console.log(entity[0].entity_name);
    // console.log(selectOptions)
    let history = useHistory();
    document.title = 'create-supply-flow';
    const [flow, setFlowReg] = useState({
        source:'',
        destination:''
    });
    const handleChangeInput = (e) => {
        const nameOfInput = e.target.name;
        const value = e.target.value;

        setFlowReg({ ...flow, [nameOfInput]:value });
        console.log(flow);
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        // const newFlow = {
        //     ...flow,
        //     id: new Date().getTime().toString(),
        // };

        // setRecords([...records, newUser]);
        // setErrors(validate(userReg));
        console.log('rule gayi');
        console.log(flow);
        console.log(flow.source);
        let token = localStorage.getItem("token")
        axios.post('https://securechain-backend.herokuapp.com/flow/',
        {
            source: flow.source,
            destination : flow.destination
    
        },
        {
            headers: {
                  Authorization: `Token ${token}`,
              }
        }).then((response) => {
            console.log(response);
            if (response.data.message) {
            alert(response.data.message);
        
            } 
            else {
            alert("Rule created");
            }
        });
        // e.target.reset();
    };
    // const handleSave= (e) => {
    //     history.push("/dashboard");
    // }
    // const [inputFields, setInputFields] = useState([{source: '', destination: '' }]);
    // const handleSubmit = (event) => {
    //     event.preventDefault();
    //     //console.log("InputFields", inputFields);
    //     //console.log(data, e)
    //     // alert('SUCCESS!')
    //     //console.log(JSON.stringify(data, null, 4))

    //     axios.post('https://securechain-backend.herokuapp.com/flow/',{
    //     headers: {
    //         Authorization: `Token ${token}`,
    //     },
    //     inputFields
    //     }).then((res) => {
    //         console.log('api response 🚀', res)
    //     })
    //     .catch((error) => {
    //         console.error(error.response)
    //     })
    //     console.log("InputFields",inputFields);
    // };
    // const handleChangeInput = (id, event) => {
    //     const newInputFields = inputFields.map(i => {
    //     if(id === i.id) {
    //         i[event.target.name] = event.target.value
    //     }
    //     return i;
    //     })
    //     console.log(event.target.value);
    //     setInputFields(newInputFields);
    // }
    // const handleAddFields = () => {
    //     setInputFields([...inputFields, {Source: '', Destination: '' }])
    // }
    // const handleRemoveFields = id => {
    //     const values  = [...inputFields];
    //     values.splice(values.findIndex(value => value.id === id), 1);
    //     setInputFields(values);
    // }
    // const handleTemplate = (event) =>{
    //     const obj = event.target.value;
    //     setEntity(obj);
    // }
    // useEffect(()=>{
    //     console.log(entity);
    // },[entity]);
    return (
        <div className="createsupply__bottom">
            <h1 className = "createsupply__bottom__head">Create Supply Chain</h1>
            <div className = "createsupplyflow">
                <div className = "createsupplyflow__big-card">
                    <div className="createsupplyflow__title">
                        <h1>Establish flow of your supply chain</h1>
                    </div>
                    <div className="createsupplyflow__formgroup">
                        <form>
                        <div className="createsupplyflow__row">
                            <div className="createsupplyflow__column">
                                <select
                                name="source"
                                onChange={handleChangeInput}
                                className = "createsupplyflow__input"
                                required
                                >
                                {
                                    entity.options.map((x)=>
                                    <option value={x.value} >{x.label}</option>
                                    )
                                }
                                </select>
                            </div>
                            <div className="createsupplyflow__column">
                                <select
                                name="destination"
                                onChange={event => handleChangeInput(event)}
                                className = "createsupplyflow__input"  
                                options={entity.options}
                                required
                                >
                                {
                                    entity.options.map((x)=>
                                    <option value={x.value}>{x.label}</option>
                                    )
                                }
                                </select>
                            </div>
                            <div className="createsupplyflow__column">
                            </div>
                        </div> 
                            {/* <IconButton onClick={handleSubmit}>
                            <AddCircleIcon/>
                            </IconButton> */}
                        <Link to='/dashboard'>
                            <button className="createsupplyflow__button" type="submit" >Save and Finish</button>
                        </Link>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Createsupplyflow


