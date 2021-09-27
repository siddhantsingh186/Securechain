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
import "./createsupply.scss";

 function Createsupply(){
   const [entity, setEntity] = useState('');
   const [template, setTemplate] = useState('');
   const [inputFields, setInputFields] = useState([{id: uuidv4(), Name: '', Type: '' }]);
   const handleSubmit = (event) => {
     event.preventDefault();
     //console.log("InputFields", inputFields);
     //console.log(data, e)
     // alert('SUCCESS!')
     //console.log(JSON.stringify(data, null, 4))
     setEntity([...entity, event.target.value]);
     axios
       .post('http://localhost:3001/api/announcement/add', {generic_attributes : inputFields,
       template : template})
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
    console.log(entity);
   setInputFields(newInputFields);
 }
  const handleAddFields = () => {
   setInputFields([...inputFields, {id: uuidv4(),Name: '', Type: '' }])
  }
  const handleRemoveFields = id => {
    const values  = [...inputFields];
    values.splice(values.findIndex(value => value.id === id), 1);
    setInputFields(values);
  }
  const handleTemplate = (event) =>{
      const obj = event.target.value;
      setTemplate(obj);
  }
  const handleEntity = (event) => {

  }
  useEffect(()=>{
  console.log(template);
  },[template]);
   return(
        <div className = "createsupply__bottom">
            <h1 className = "createsupply__bottom__head">Create Supply Chain</h1>
            <h2 className = "createsupply__bottom__head1">Create New Entity</h2>
            <div className = "createsupply__bottom__head1__part1">
            <Container>
              <form onSubmit = {event => handleSubmit(event)}>
                <TextField
                  name="Entity"
                  label="Entity Name"
                  variant="filled"
                  //value={}
                  onChange={e => handleEntity(e)}
                  />
                  <hr></hr>
                  <h3>Select Template</h3>
                  <select className = "createsupply__bottom__head1__part1__select1" onChange = {event => handleTemplate(event)}>
                    <option value="none" selected disabled hidden>Select an Option</option>
                    <option value = "manufacturer">Manufacturer</option>
                    <option value = "transporter">Transporter</option>
                    <option value = "distributor">Distributor</option>
                  </select>
                  <h3>Add Attributes</h3>
                  <p>Define attributes as per your requirement from the selected instance</p>
                  <hr></hr>
                  {inputFields.map((inputField , index)=> (
                      <div key={index}>
                      <TextField
                        name="Name"
                        label="Attribute Name"
                        variant="filled"
                        value={inputFields.Name}
                        onChange={event => handleChangeInput(inputField.id, event)}
                        />
                        <select
                          name="Type"
                          label="Attribute Type"
                          onChange={event => handleChangeInput(inputField.id, event)}
                          className = "createsupply__bottom__head1__part1__select2"
                          >
                          <option value="none" selected disabled hidden>Select an Option</option>
                          <option value="String">String</option>
                          <option value="AlphaNumeric">Alphanumeric</option>
                          <option value="Number">Number</option>
                          <option value="Date">Date</option>
                        </select>
                        <IconButton disabled={inputFields.length === 1} onClick={() => handleRemoveFields(inputField.id)}>
                          <RemoveCircleRoundedIcon/>
                        </IconButton>
                        <IconButton onClick={handleAddFields}>
                          <AddCircleIcon/>
                        </IconButton>
                      </div>
                  ))}
                  <Button
                    variant="contained"
                    color="primary"
                    type="submit"
                    onClick={event => handleSubmit(event)}>
                    Add Entity
                  </Button>
              </form>
            </Container>
            </div>
            <div className = "createsupply__bottom__head1__part2">
            <Button
              variant="contained"
              color="primary"
              type="submit">
              Add
            </Button>
            </div>
          </div>
   );
 }
 export default Createsupply;
