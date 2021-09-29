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
   const [temptemplate, settempTemplate] = useState('');
   const [entity, setEntity] = useState('');
   const [template, setTemplate] = useState({options : [], id: '',value: ''});
   const [inputFields, setInputFields] = useState([{id: uuidv4(), name: '', type: '' }]);
   const handleSubmit = (event, entity, temptemplate, inputFields) => {
     event.preventDefault();
     let data = {
       entity_name : entity,
       template : temptemplate,
       supply_chain : 2,
       generic_attributes : inputFields
     }
     //console.log("InputFields", inputFields);
     //console.log(data, e)
     // alert('SUCCESS!')
     //console.log(JSON.stringify(data, null, 4))
     console.log(JSON.stringify(data, null, 4));
     let token = localStorage.getItem("token")
     axios
     .post("https://securechain-backend.herokuapp.com/entity/",data ,
                 {
                   headers: {
                         Authorization: `Token ${token}`,
                     }
                 }
             )
       .then((res) => {
         console.log('api response 🚀', res)
       })
       .catch((error) => {
         console.error(error.response)
       })
     }
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
   setInputFields([...inputFields, {id: uuidv4(),name: '', type: '' }])
  }
  const handleRemoveFields = id => {
    const values  = [...inputFields];
    values.splice(values.findIndex(value => value.id === id), 1);
    setInputFields(values);
  }
    const handleTemplate = (event) =>{
      console.log(event.target.value);
        settempTemplate(event.target.value);
    }
  useEffect(() => {
      let token = localStorage.getItem("token")
      axios.get("http://securechain-backend.herokuapp.com/template/",{
          headers: {
              Authorization: `Token ${token}`,
          }
      }).then((res) => {
          // console.log('api response 🚀', res)
          setTemplate({
              options:res.data.map(d => ({
                  "value" : d.id,
                  "label" : d.template_name
                }))
          })
      })
      .catch((error) => {
          console.error(error.response)
      });
  },[]);
  // console.log(template.options)
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
                  onChange={e => setEntity(e.target.value)}
                  />
                  <hr></hr>
                  <h3>Select Template</h3>
                  {template.options && <select className = "createsupply__bottom__head1__part1__select1" onChange = {handleTemplate}>
                    <option value="none" selected disabled hidden>Select an Option</option>
                    {
                        template.options.map((x)=>{
                        return(
                        <option value = {x.value}>{x.label}</option>);
                      })
                    }
                    </select>}
                  <h3>Add Attributes</h3>
                  <p>Define attributes as per your requirement from the selected instance</p>
                  <hr></hr>
                  {inputFields.map((inputField , index)=> (
                      <div key={index}>
                      <TextField
                        name="name"
                        label="Attribute Name"
                        variant="filled"
                        value={inputFields.name}
                        onChange={event => handleChangeInput(inputField.id, event)}
                        />
                        <select
                          name="type"
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
                    onClick={event => handleSubmit(event, entity, temptemplate, inputFields)}>
                    Add Entity
                  </Button>
              </form>
            </Container>
            </div>
            {/*<div className = "createsupply__bottom__head1__part2">
            <Button
              variant="contained"
              color="primary"
              type="submit">
              Add
            </Button>
            </div>*/}
          </div>
   );
 }
 export default Createsupply;
