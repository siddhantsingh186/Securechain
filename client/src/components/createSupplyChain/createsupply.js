import React , { useState, useEffect }from 'react';
import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import IconButton from '@mui/material/IconButton';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import RemoveCircleRoundedIcon from '@mui/icons-material/RemoveCircleRounded';
import Button from '@mui/material/Button';
import FormLabel from '@mui/material/FormLabel';
import { v4 as uuidv4 } from 'uuid';
import axios from 'axios';
import "./createsupply.scss";
import {useHistory } from 'react-router';

 function Createsupply(){
   let templateid = 0;
   let history = useHistory();
   //const [renderattribute,setAttribute] = useState(false);
   const [formkey, setFormkey] = useState(2);
   const [displayent, setDisplayent] = useState([]);
   const [selectedtemplate,setselectedTemplate] = useState({id : 0, templatename : '' , attributes : []});
   const [temptemplate, settempTemplate] = useState('');
   const [entity, setEntity] = useState('');
   const [template, setTemplate] = useState({options : [], id: '',value: ''});
   const [inputFields, setInputFields] = useState([{id: uuidv4(), name: '', type: '' }]);
   const handleSubmit = (event, entity, temptemplate, inputFields) => {
     event.preventDefault();
     let data = {
       entity_name : entity,
       template : temptemplate,
       supply_chain : localStorage.getItem("supply_chain"),
       generic_attributes : inputFields
     }
     //console.log("InputFields", inputFields);
     //console.log(data, e)
     // alert('SUCCESS!')
     //console.log(JSON.stringify(data, null, 4))
     // console.log(JSON.stringify(data, null, 4));
     let token = localStorage.getItem("token")
     axios
     .post("https://securechain-backend.herokuapp.com/entity/", data,
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
       setDisplayent(displayent =>
         [...displayent, entity]
       );
       setFormkey(formkey + 1);
       setInputFields([{id: uuidv4(), name: '', type: '' }]);
       setselectedTemplate({id : 0, templatename : '' , attributes : []});
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
  const handleCreateFlow = () => {
    history.push("/createsupplyflow");
  }
  const handleRemoveFields = id => {
    console.log(id);
    setInputFields(inputFields.splice(id, 1));
  }
    const handleTemplate = (event) =>{
      templateid = event.target.value;
      console.log(templateid);
      let token = localStorage.getItem("token");
      if(templateid !== 0){
        axios.get("http://securechain-backend.herokuapp.com/template/" + templateid + "/",{
            headers: {
                Authorization: `Token ${token}`,
            }
        }).then((res) => {
            console.log('api response 🚀', res)
            let attr = [];
            attr = res.data.attributes.split(";")
            let attr1 = []
            attr.map(e => {
              return attr1.push(JSON.parse(e));
            })
            console.log(attr1);
            // console.log(attr);
            setselectedTemplate({
                id : res.data.id,
                templatename : res.data.template_name,
                attributes : attr1
            });
            // console.log(attr);
        })
        .catch((error) => {
            console.error(error.response)
        });
      }
        settempTemplate(event.target.value);
        console.log(selectedtemplate);
    }
    useEffect(() => {
      //setAttribute(true);
      console.log(inputFields);
    },[inputFields]);

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
                  "label" : d.template_name,
                  "attributes" : d.attributes
                }))
          })
          console.log(JSON.stringify(res.data.attributes, null, 4));
      })
      .catch((error) => {
          console.error(error.response)
      });
  },[]);
  console.log(template.options);
  
   return(
          <div className = "createsupply__bottom">
            <h1 className = "createsupply__bottom__head">Create Supply Chain</h1>
            <div className="createsupply__bottom__maincard">
              <div className="createsupply__bottom__maincard__formpart">
                <h2 className = "createsupply__bottom__maincard__formpart__h2">Created entities</h2>
                <div className = "entitiesdisplay">
                  {displayent !== '' && displayent.map((element) => (
                    <div className = "displayent">{element}</div>
                  ))}
                </div>
                <h2 className = "createsupply__bottom__maincard__formpart__h1">Create New Entity</h2>
                  <Container className = "createsupply__bottom__maincard__formpart__head1">
                    <form key = {formkey}  onSubmit = {event => handleSubmit(event)}>
                      <TextField
                        name="Entity"
                        label="Entity Name"
                        variant="filled"
                        //value={}
                        onChange={e => setEntity(e.target.value)}
                        />
                        <h3>Select Template</h3>
                        {template.options && <select className = "createsupply__bottom__maincard__formpart__head1__part1__select1" onChange = {handleTemplate}>
                          <option value="none" selected disabled hidden>Select an Option</option>
                          {
                              template.options.map((x)=>{
                              return(
                              <option value = {x.value}>{x.label}</option>);
                            })
                          }
                          </select>}
                          <h3>Default Attributes</h3>
                          {selectedtemplate.attributes.map((value) => {
                            return (
                              <div className="createsupply__bottom__maincard__formpart__head1__part1__templateattribute">
                              <div className = "createsupply__bottom__maincard__formpart__head1__part1__label1">{value.name}</div>
                              <div className = "createsupply__bottom__maincard__formpart__head1__part1__label2">{value.type}</div>
                            </div>
                          );
                        })}
                        <h3>Add Attributes</h3>
                        <p>Define attributes as per your requirement from the selected instance</p>
                        <hr></hr>
                        {inputFields.map((inputField , index)=> (
                            <div className="createsupply__bottom__maincard__formpart__head1__fillAttribute">
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
                                className = "createsupply__bottom__maincard__formpart__head1__part1__select2"
                                >
                                <option value="none" selected disabled hidden>Select an Option</option>
                                <option value="String">String</option>
                                <option value="Alphanumeric">Alphanumeric</option>
                                <option value="Number">Number</option>
                                <option value="Date">Date</option>
                              </select>
                              <IconButton disabled={inputFields.length === 1} onClick={() => handleRemoveFields(index)}>
                                <RemoveCircleRoundedIcon/>
                              </IconButton>
                              {index === inputFields.length - 1?
                                  <IconButton onClick={handleAddFields}>
                                    <AddCircleIcon/>
                                  </IconButton>
                              :null}
                            </div>
                        ))}
                        <Button
                          style={{width: "fit-content", margin: "auto"}}
                          variant="contained"
                          color="primary"
                          type="submit"
                          onClick={event => handleSubmit(event, entity, temptemplate, inputFields)}>
                          Add Entity
                        </Button>
                        <br/>
                        <Button
                          style={{width: "fit-content", margin: "auto"}}
                          variant="contained"
                          color="primary"
                          type="submit"
                          onClick={event => handleCreateFlow(event)}>
                          Create Flows
                        </Button>
                        <br/>
                    </form>
                  </Container>
                {/*<div className = "createsupply__bottom__head1__part2">
                <Button
                  variant="contained"
                  color="primary"
                  type="submit">
                  Add
                </Button>
                </div>*/}
              </div>
              <div className="createsupply__bottom__maincard__imagepart">
                <div className="createsupply__bottom__maincard__imagepart__image" style={{ backgroundImage: `url(media/create.jpg)` }}/>
              </div>
            </div>
          </div>
   );
 }
 export default Createsupply;
