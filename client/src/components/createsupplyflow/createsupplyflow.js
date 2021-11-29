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
import zIndex from '@mui/material/styles/zIndex';

const Createsupplyflow = () => {
    const [inputList, setInputList] = useState([{ firstName: "", lastName: "" }]);
    const handleInputChange = (e, index) => {
        const { name, value } = e.target;
        const list = [...inputList];
        list[index][name] = value;
        setInputList(list);
      };
     
      // handle click event of the Remove button
      const handleRemoveClick = index => {
        const list = [...inputList];
        list.splice(index, 1);
        setInputList(list);
      };
     
      // handle click event of the Add button
      const handleAddClick = () => {
        setInputList([...inputList, { firstName: "", lastName: "" }]);
      };
    const [entity,setEntity] = useState({
        options:[],
        value:'',
        id:''
    });
    useEffect(() => {
        let token = localStorage.getItem("token")
        let data = {
            "supply_chain": localStorage.getItem("supply_chain")
        }
        axios.post("https://securechain-backend.herokuapp.com/entitybysupplychain/", data, {
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
    };
    return (
        <div className="createsupply__bottom">
            <h1 className = "createsupply__bottom__head">Create Supply Chain</h1>
            <div className = "createsupplyflow">
                <div className = "createsupplyflow__big-card">
                    <div className = "createsupplyflow__row">
                        <div className = "createsupplyflow__column1">
                            <div className="createsupplyflow__title">
                                <h1>Establish flow of your supply chain</h1>
                            </div>
                            <div className="createsupplyflow__formgroup">
                                <form onSubmit={handleSubmit}>
                                    {inputList.map((x, i) => {
                                        return (
                                            <div>
                                                <div className="createsupplyflow__row">
                                                    <div className="createsupplyflow__column">
                                                        <select
                                                        name="source"
                                                        value={x.source}
                                                        className = "createsupplyflow__input"
                                                        onChange={handleChangeInput}
                                                        required
                                                        >
                                                        <option selected disabled hidden>Source</option>
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
                                                        value={x.destination}
                                                        onChange={handleChangeInput}
                                                        className = "createsupplyflow__input"  
                                                        options={entity.options}
                                                        required
                                                        >
                                                        <option selected disabled hidden>Destination</option>
                                                        {
                                                            entity.options.map((x)=>
                                                            <option value={x.value}>{x.label}</option>
                                                            )
                                                        }
                                                        </select>
                                                        
                                                    </div>
                                                </div>
                                                <div className="createsupplyflow__row">
                                                    {/* <div className="createsupplyflow__column"></div> */}
                                                    <div className="createsupplyflow__column">
                                                        {inputList.length - 1 === i &&<button className="createsupplyflow__button1" onClick={handleSubmit}>Save rule</button>}
                                                    </div>
                                                    <div className="createsupplyflow__column">
                                                        {inputList.length - 1 === i && <button className="createsupplyflow__button2" onClick={handleAddClick}>Add rule</button>}
                                                    </div>
                                                    {/* <div className="createsupplyflow__column"></div> */}
                                                </div> 
                                            </div>
                                        );
                                    })}
                                    <Link to='/dashboard'>
                                        <button className="createsupplyflow__button" type="submit" >Save and Finish</button>
                                    </Link>
                                </form>
                            </div>
                        </div>
                        <div className = "createsupplyflow__column2">
                            <div className="createsupplyflow__column2__image" style={{ backgroundImage: `url(media/create-supply-flow.jpg)` }}>
                            </div>
                        </div>
                    </div>
                        
                </div>
            </div>
        </div>
    )
}

export default Createsupplyflow


