import React from 'react';
import {Form, Button, Table} from 'react-bootstrap';
import {useState, createRef} from 'react';
import './Supply.scss';
function Supply(){
  let initialEntity = [];
  const[entity, addEntity] = useState(initialEntity);
  const formData = createRef();
  const add = (event) =>{
    event.preventDefault();
    const newEntity = {
      entityname : formData.current.entityname.value,
      ethereumaddress : formData.current.ethereumaddress.value
    }
    addEntity([...entity, newEntity]);
    console.log(entity);
  }
  return(
    <div className = "supply">
      <div className = "supply__head">
        <h1 className = "supply__head__heading">Create Supply Chain</h1>
      </div>
      <div className = "supply__below">
        <Form onSubmit = {add} ref = {formData}>
          <Form.Group className="mb-3" controlId="formBasicName">
            <Form.Label>Entity Name</Form.Label>
            <Form.Control type="text" placeholder="Enter Entity Name" name="entityname"/>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicAddress">
            <Form.Label>Ethereum Address</Form.Label>
            <Form.Control type="text" placeholder="Enter Address" name="ethereumaddress"/>
          </Form.Group>
          <Button variant="primary" type="submit" >Add to Chain</Button>
        </Form>
        <Table striped bordered hover variant="dark">
              <thead>
                  <tr>
                      <th>Index</th>
                      <th>Entity Name:</th>
                      <th>Ethereum Address</th>
                  </tr>
              </thead>
              <tbody>
                  {
                      entity.map((item, index)=>{
                          return(
                              <tr key={index}>
                                  <td>{index}</td>
                                  <td>{item.entityname}</td>
                                  <td>{item.ethereumaddress}</td>
                              </tr>
                          )
                      })
                  }
              </tbody>
              </Table>
      </div>
    </div>
  );
}
export default Supply;
