import React , { useState, useEffect }from 'react';
import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import IconButton from '@mui/material/IconButton';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import RemoveCircleRoundedIcon from '@mui/icons-material/RemoveCircleRounded';
import Button from '@mui/material/Button';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import { v4 as uuidv4 } from 'uuid';
import axios from 'axios';
import "./createsupplyflow.scss";

const Createsupplyflow = () => {
    const [inputFields, setInputFields] = useState([{id: uuidv4(),  Source: '', Destination: '' }]);
    const handleSubmit = (event) => {
        event.preventDefault();
        //console.log("InputFields", inputFields);
        //console.log(data, e)
        // alert('SUCCESS!')
        //console.log(JSON.stringify(data, null, 4))

        axios.post('http://localhost:3001/api/announcement/add', {generic_attributes : inputFields})
        .then((res) => {
            console.log('api response 🚀', res)
        })
        .catch((error) => {
            console.error(error.response)
        })
        console.log("InputFields",inputFields);
    };
    const handleChangeInput = (id, event) => {
        const newInputFields = inputFields.map(i => {
        if(id === i.id) {
            i[event.target.name] = event.target.value
        }
        return i;
        })
        console.log(event.target.value);
        setInputFields(newInputFields);
    }
    const handleAddFields = () => {
        setInputFields([...inputFields, {id: uuidv4(),Source: '', Destination: '' }])
    }
    const handleRemoveFields = id => {
        const values  = [...inputFields];
        values.splice(values.findIndex(value => value.id === id), 1);
        setInputFields(values);
    }
    // const handleTemplate = (event) =>{
    //     const obj = event.target.value;
    //     setTemplate(obj);
    // }
    // useEffect(()=>{
    //     console.log(template);
    // },[template]);
    return (
        <div class="createsupply__bottom">
            <h1 className = "createsupply__bottom__head">Create Supply Chain</h1>
            <div className = "createsupplyflow">
                <div class="createsupplyflow__title">
                    <h1>Establish flow of your supply chain</h1>
                </div>
                <div class="createsupplyflow__formgroup">
                    <form onSubmit = {event => handleSubmit(event)}>
                        {inputFields.map((inputField , index)=> (
                        <div key={index}>
                            <select
                            name="Source"
                            label="Attribute Type"
                            onChange={event => handleChangeInput(inputField.id, event)}
                            className = "createsupply__bottom__head1__part1__select2" required>
                                <option value="" selected hidden disable>Source</option>
                                <option value="Manufacturer">Manufacturer</option>
                                <option value="Manufacturer-1">Manufacturer-1</option>
                                <option value="Transporter">Transporter</option>
                                <option value="Distributor">Distributor</option>
                            </select>
                            <select
                            name="Destination"
                            label="Attribute Type"
                            onChange={event => handleChangeInput(inputField.id, event)}
                            className = "createsupply__bottom__head1__part1__select2" required>
                                <option value="" selected hidden disable>Destination</option>
                                <option value="Manufacturer">Manufacturer</option>
                                <option value="Manufacturer-1">Manufacturer-1</option>
                                <option value="Transporter">Transporter</option>
                                <option value="Distributor">Distributor</option>
                            </select>
                            <IconButton disabled={inputFields.length === 1} onClick={() => handleRemoveFields(inputField.id)}>
                            <RemoveCircleRoundedIcon/>
                            </IconButton>
                            <IconButton onClick={handleAddFields}>
                            <AddCircleIcon/>
                            </IconButton>
                        </div>
                    ))}
                    <input onClick={handleSubmit} className="createsupplyflow__button" type="submit" value="Save and Finish"></input>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Createsupplyflow

