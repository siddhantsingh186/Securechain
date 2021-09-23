import React , { useState }from 'react';
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
import "./createsupply.scss";

 function Createsupply(){
   const [inputFields, setInputFields] = useState([{id: uuidv4(), Name: '', Type: '' }]);
   const handleSubmit = (e) => {
     e.preventDefault();
     console.log("InputFields", inputFields);
   };
   const handleChangeInput = (id, event) => {
     const newInputFields = inputFields.map(i => {
       if(id === i.id) {
         i[event.target.name] = event.target.value
       }
       return i;
     })
   setInputFields(newInputFields);
 }
  const handleAddFields = () => {
   setInputFields([...inputFields, {id: uuidv4(), Name: '', Type: '' }])
  }
  const handleRemoveFields = id => {
    const values  = [...inputFields];
    values.splice(values.findIndex(value => value.id === id), 1);
    setInputFields(values);
  }
   return(
        <div className = "createsupply__bottom">
            <h1 className = "createsupply__bottom__head">Create Supply Chain</h1>
            <h2 className = "createsupply__bottom__head1">Add Entities</h2>
            <div className = "createsupply__bottom__head1__part1">
            <Container>
              <form onSubmit = {handleSubmit}>
                  <h2>Entity 1</h2>
                  <hr></hr>
                  <h3>Select Template</h3>
                  <select>
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
                      <TextField
                        name="Name"
                        label="Attribute Type"
                        variant="filled"
                        value={inputFields.Type}
                        onChange={event => handleChangeInput(inputField.id, event)}
                        />
                        {/*<InputLabel id="demo-simple-select-label">Type</InputLabel>
                        <Select
                          labelId="Select Type"
                          id="demo-simple-select"
                          value={inputFields.Type}
                          label="Age"
                          onChange={event => handleChangeInput(inputField.id, event)}
                          >
                          <MenuItem value={'String'}>String</MenuItem>
                          <MenuItem value={'AlphaNumeric'}>Alphanumeric</MenuItem>
                          <MenuItem value={'Number'}>Number</MenuItem>
                        </Select>*/}
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
                    onClick={handleSubmit}>
                    Add
                  </Button>
              </form>
            </Container>
            </div>
            <div className = "createsupply__bottom__head1__part2">
            <Button
              variant="contained"
              color="primary"
              type="submit">
              Add New Entity
            </Button>
            </div>
          </div>
   );
 }
 export default Createsupply;
