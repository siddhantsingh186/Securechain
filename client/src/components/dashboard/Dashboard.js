import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "./Dashboard.scss";
import { useHistory } from 'react-router';
import Card from "@material-tailwind/react/Card";
import CardImage from "@material-tailwind/react/CardImage";
import CardBody from "@material-tailwind/react/CardBody";
import CardFooter from "@material-tailwind/react/CardFooter";
import H6 from "@material-tailwind/react/Heading6";
import Paragraph from "@material-tailwind/react/Paragraph";
import Button from "@material-tailwind/react/Button";

function Dashboard(){
  let history = useHistory();
  let token = localStorage.getItem("token");
  const [availablesupply, setavailablesupply] = useState([]);

  useEffect(() => {
    axios
        .get('https://securechain-backend.herokuapp.com/supplychain/',
            {
                headers: {
                    Authorization: `Token ${token}`
                }
            }
        )
        .then((res) => {
          setavailablesupply(
            res.data
          );
          console.log(res.data);
          })
        .catch((err) => {
            console.log(err)
        })
}, [])


  const handleClick = (event) => {
    history.push('/createsupplyhome');
  }
  return(
    <div className = "dashboard">
      <h1 className = "dashboard__head">Dashboard</h1>
        {availablesupply.map((e)=>{
          return(
            <div className = "flex flex-row gap-x-2">
              <Card className = "dashboardmiddle">
              <CardImage
                src="media/about.png"
                alt="Card Image"
              />
              <CardBody>
                <H6 clacolor="gray">{e.name}</H6>
                <Paragraph color="gray">{e.details}</Paragraph>
              </CardBody>
              <CardFooter>
                <Button color="lightBlue" size="lg" ripple="light">
                    Read More
                </Button>
              </CardFooter>
            </Card>
            </div>
            )})}  
      <div  className = "dashboard__button">
        <Button className ="dashboard__button__style" ripple="light" onClick = {handleClick}>Create New Supply Chain</Button>
      </div>
    </div>
  );
}
export default Dashboard;
