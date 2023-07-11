import React from 'react'
import { useContext,useRef } from 'react'
import {loginCall} from "../../apiCalls"
import {AuthContext} from "../../context/AuthContext"
// import {CircularProgress} from '@mui/material'
import './login.css'

export default function Login() {
    const email=useRef();
    const password=useRef();
    const {isFetching,dispatch}=useContext(AuthContext);

    const handleClick =(e)=>{
        e.preventDefault();
        loginCall(
            {email: email.current.value,password: password.current.value},
            dispatch
        )
    }
  return (
    <div className="login">
        <div className="loginWrapper">
            <div className="loginLeft">
                <h3 className="loginLogo">Bonding</h3>
                <span className="loginDesc">
                    Connect with your friends ad the world around you on Bonding
                </span>
            </div>
            <div className="logintRight">
                <form className="loginBox" onSubmit={handleClick}>
                    <input 
                        placeholder='Email' 
                        type='email'
                        required
                        className="loginInput"
                        ref={email}
                        />
                    <input 
                        placeholder='Password' 
                        type='password'
                        required
                        minLength="6"
                        ref={password}
                        className="loginInput" 
                    />
                    <button className="loginButton" type='submit' disabled={isFetching}>
                       Login 
                    </button>
                    <span className="loginForgot">Forgot Password?</span>
                    <button className="loginRegisterButton">
                        Create a New Account
                    </button>
                </form>
            </div>
        </div>
    </div>
  )
}
