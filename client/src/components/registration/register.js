import React from 'react'
import './register.scss'
import { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import Axios from 'axios'

const Register = () => {

    let history = useHistory();
    document.title = 'register';
    const [userReg, setUserReg] = useState({
        firstname: '',
        lastname:'',
        role:'',
        email: '',
        password: ''
    });

    let flag = 1;

    function validate(values) {

        let error = {};

        //email
        // if (!values.email) {
        // error.email = 'Email required';
        // flag = 0;
        // } else if (!/\S+@\S+\.\S+/.test(values.email)) {
        // error.email = 'Email address is invalid';
        // flag = 0;
        // }

        //password
        // if (!values.password) {
        // error.password = 'Password is required';
        // flag = 0;
        // } 
        // else if (values.password.length < 6) {
        // error.password = 'Password needs to be 6 characters or more';
        // flag = 0;
        // }

        //match password 
        // if(values.password!=values.cpassword)
        // {
        //     alert('Wrong password mc')
        //     error.cpassword = 'Password do not match!';
        //     flag=0;
        // }

        return error;
    }

    const [errors, setErrors] = useState({});
    // const [records, setRecords] = useState([]);

    const handleInput = (e) => {
        const nameOfInput = e.target.name;
        const value = e.target.value;

        setUserReg({ ...userReg, [nameOfInput]:value });
    };

    const submitForm = (e) => {
        e.preventDefault();
        const newUser = {
            ...userReg,
            id: new Date().getTime().toString(),
        };

        // setRecords([...records, newUser]);
        setErrors(validate(userReg));

        if (flag === 1) {
            console.log('post gayi');
            console.log(userReg);
            console.log(userReg.email);
            Axios.post('https://securechain-backend.herokuapp.com/signup/', {
                firstname: userReg.firstname,
                lastname: userReg.lastname,
                email: userReg.email,
                password: userReg.password,
                role: userReg.role,
        
            }).then((response) => {
                console.log(response);
                if (response.data.message) {
                alert(response.data.message);
            
                } 
                else {
                alert("Registered Successfully");
                history.push('/login');
                }
        
            });
        }
        e.target.reset();
    };
    return (
        <div>
            <div className="login_background_image" style={{backgroundImage:`url(media/back3.jpg)`}}>
                <div className="container">
                    <form onSubmit={submitForm}>
                        <div className="Title">
                            <h1>Register</h1>
                        </div>
                        <div className="Login">
                            <p>Already a member? <a href="/login">Login</a></p>
                        </div>
                        <div className="Linebreaker">
                            <hr></hr>
                        </div>
                        <div className="form-group">
                            <label className="formLabel" htmlFor="firstname">First Name</label><br/>
                            <input onChange={handleInput} className="formInput" type="text" name="firstname" id="firstname" required></input>
                        </div>
                        <div className="form-group">
                            <label className="formLabel" htmlFor="name">Last Name</label><br/>
                            <input onChange={handleInput} className="formInput" type="text" name="lastname" id="lastname" required></input>
                        </div>
                        <div className="form-group">
                            <label className="formLabel" htmlFor="role" for="role">Account Type</label><br/>
                            <select onChange={handleInput} className ="formInput1" name="role" id="role">
                                <option value="OWNER">Owner</option>
                                <option value="PARTICIPANT">Participant</option>
                            </select>
                        </div>
                        <div className="form-group">
                            <label className="formLabel" htmlFor="email">Email</label><br/>
                            <input onChange={handleInput} className="formInput" type="text" name="email" id="email" required></input>
                        </div>
                        <div className="form-group">
                            <label className="formLabel" htmlFor="password">Password</label><br/>
                            <input onChange={handleInput} className="formInput" type="password" name="password" id="password" required></input>
                        </div>
                        <div className="form-group">
                            <label className="formLabel" htmlFor="cpassword">Confirm Password</label><br/>
                            <input className="formInput" type="password" name="cpassword" id="cpassword" required></input>
                        </div>
                        <div className="form-submit">
                            <input className="formButton" type="submit" value="Submit"></input>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Register



