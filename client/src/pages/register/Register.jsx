import React from 'react'
import axios from 'axios'
import { useRef } from 'react'
import {useNavigate} from 'react-router'
import './register.css'


export default function Register() {
    const username =useRef();
    const email =useRef();
    const password=useRef();
    const passwordAgain=useRef();
    const navigate=useNavigate();
    
    const handleClick =async (e)=>{
        e.preventDefault();
        if(passwordAgain.current.value!==password.current.value){
            passwordAgain.current.setCustomValidity("Passwords don't match!");
        }else{
            const user={
                username: username.current.value,
                email: email.current.value,
                password: password.current.value,
            }
            try{
                await axios.post("/auth/register",user);
                navigate.push("/login")
            }catch(err){
                console.log(err);
            }
        }
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
                        placeholder='Username' 
                        className="loginInput" 
                        required
                        ref={username}
                        />    
                    <input 
                        placeholder='Email' 
                        className="loginInput" 
                        required
                        ref={email}
                        type='email'
                        />
                    <input 
                        placeholder='Password' 
                        className="loginInput" 
                        required
                        ref={password}
                        type='password'
                        minLength='6'
                        />
                    <input 
                        placeholder='Password Again' 
                        className="loginInput" 
                        required
                        ref={passwordAgain}
                        type='password'
                    />
                    <button className="loginButton" type='submit'>Sign Up</button>
                    <button className="loginRegisterButton" >
                        Log into Account
                    </button>
                </form>
            </div>
        </div>
    </div>
  )
}
