//rafce
import React from 'react'
import './login.scss';

const login = () => {
    return (
        <div>
            <div className="login_background_image" style={{backgroundImage:`url(media/back2.jpg)`}}>
                <div className="container-1">
                    <form>
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
                            <input className="formInput" type="text" name="email" id="email" required></input>
                        </div>
                        <div className="form-group">
                            <label className="formLabel" htmlFor="password">Password</label><br/>
                            <input className="formInput" type="password" name="password" id="password" required></input>
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

export default login
