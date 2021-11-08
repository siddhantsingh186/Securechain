//rafce
import React from 'react'
import './login.scss';
import { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import Axios from 'axios'

const Login = () => {

    let history = useHistory();
    document.title = 'login';
    const [userReg, setUserReg] = useState({
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
        // console.log(e.target.value)
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
            console.log('login gayi');
            console.log(userReg);
            console.log(userReg.email);
            Axios.post('https://securechain-backend.herokuapp.com/login/', {
                email: userReg.email,
                password: userReg.password
            }).then((response) => {
                localStorage.setItem("token", response.data.Token)
                localStorage.setItem("username", response.data.user_name);
                console.log(response);
                console.log(response.data);
                console.log(response.data.Token);
                if (response.data.message) {
                alert(response.data.message);
                }
                else {
                alert("Logined Successfully");
                history.push('/dashboard');
                }

            });
        }
        e.target.reset();
    };

    return (
        <div>
            <div className="login_background_image" style={{backgroundImage:`url(media/back2.jpg)`}}>
                <div className="container-1">
                    <form onSubmit={submitForm}>
                        <div className="Title">
                            <h1>Login</h1>
                        </div>
                        <div className="Login">
                            <p>Don't have an account?<a href="/register"> Register Now!</a></p>
                        </div>
                        <div className="Linebreaker1">
                            <hr></hr>
                        </div>
                        <div className="form-group">
                            <label className="formLabel" htmlFor="email">Email</label><br/>
                            <input onChange={handleInput} className="formInput" type="text" name="email" id="email" required></input>
                        </div>
                        <div className="form-group">
                            <label className="formLabel" htmlFor="password">Password</label><br/>
                            <input onChange={handleInput} className="formInput" type="password" name="password" id="password" required></input>
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

export default Login
