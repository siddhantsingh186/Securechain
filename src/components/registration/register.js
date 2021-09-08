import React from 'react'
import './register.scss'

const register = () => {
    return (
        <div>
            <div className="login_background_image" style={{backgroundImage:`url(media/back3.jpg)`}}>
                <div className="container">
                    <form>
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
                            <label className="formLabel" htmlFor="account" for="account">Account Type</label><br/>
                            <select className ="formInput1" name="account" id="account">
                                <option value="owner">Owner</option>
                                <option value="participant">Participant</option>
                            </select>
                        </div>
                        <div className="form-group">
                            <label className="formLabel" htmlFor="email">Email</label><br/>
                            <input className="formInput" type="text" name="email" id="email"></input>
                        </div>
                        <div className="form-group">
                            <label className="formLabel" htmlFor="password">Password</label><br/>
                            <input className="formInput" type="password" name="password" id="password"></input>
                        </div>
                        <div className="form-group">
                            <label className="formLabel" htmlFor="cpassword">Confirm Password</label><br/>
                            <input className="formInput" type="password" name="cpassword" id="cpassword"></input>
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

export default register



