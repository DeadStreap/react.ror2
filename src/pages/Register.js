import React, { useEffect, useState, useRef, Component} from "react";
import { Link } from 'react-router-dom';
import axios from '../api/axios'

const REG_URL = 'http://localhost:8080/api/user/register'

const USER_REGEX = /^[a-zA-Z0-9-_]{2,10}$/;
const PWD_REGEX = /^[a-zA-Z0-9-_]{4,20}$/;
const EMAIL_REGEX = /^[a-zA-Z0-9]+@(?:[a-zA-Z0-9]+\.)+[A-Za-z]+$/;

const Register = () =>{
  const userRef = useRef();
  const errRef = useRef();

  const [user, setUser] = useState('');
  const [validName, setValidName] = useState(false);

  const [pwd, setPwd] = useState('');
  const [validPwd, setValidPwd] = useState(false);

  const [matchPwd, setMatchPwd] = useState('');
  const [validMatch, setValidMatch] = useState(false);

  const [email, setEmail] = useState('');
  const [validEmail, setValidEmail] = useState('');

  const [errMsg, setErrMsg] = useState('');
  const [success, setSucess] = useState(false);

  useEffect(() =>{
    userRef.current.focus(); 
  }, [])

  useEffect(() =>{
    const result = USER_REGEX.test(user)
    setValidName(result)
  }, [user])

  useEffect(() =>{
    const result = PWD_REGEX.test(pwd)
    setValidPwd(result)
    const match = pwd === matchPwd; 
    setValidMatch(match)
  }, [pwd, matchPwd])

  useEffect(() =>{
    const result = EMAIL_REGEX.test(email)
    setValidEmail(result)
  }, [email])

  useEffect(() =>{
    setErrMsg(' ')
  }, [user, pwd, matchPwd])

  const handleSubmit = async (e) => {
    e.preventDefault()
    const v1 = USER_REGEX.test(user);
    const v2 = PWD_REGEX.test(pwd);
    const v3 = EMAIL_REGEX.test(email);
    if(!v1 || !v2 || !v3){
      setErrMsg("Invalid Entry")
      return
    }
    try{
      const userInf = ({login: user, password: pwd, email: email})
      const response = await axios.post(REG_URL, userInf,
       {
        headers: {"Content-Type": 'application/json'}
       });
        setSucess(true);
    } catch (err){
      if(!err?.response){
        setErrMsg('No Server Response')
      } else if (err.response?.status == 409){
        setErrMsg('Username Takken')
      } else {
        setErrMsg('Registration Failed')
      }
    }
  }

  return(
    <>
    {success ? (
      <div className='register-form'>
        <form>
          <h1>Success!</h1>
          <Link to="/authorization">Sign In</Link>
        </form>
      </div>
    ) : (
    <div className='register-form'>
               <form onSubmit={handleSubmit}>
                  <h1>Register</h1>
                  <h1>{ errMsg }</h1>
                  <label className={validName ? "valid" : "form-label"}>Login: <input type="text" name="login" ref={userRef} onChange={(e) => setUser(e.target.value)} area-onvalid={validName ? "false" : "true"} required/> </label>
                  <label className={validPwd ? "valid" : "form-label"}>Password: <input type="password" name='password' ref={userRef} onChange={(e) => setPwd(e.target.value)} area-onvalid={validPwd ? "false" : "true"} required/> </label>
                  <label className={validMatch && matchPwd ? "valid" : "form-label"}>Password confirm: <input type="password" name='password_confirm' onChange={(e) => setMatchPwd(e.target.value)} area-onvalid={validMatch ? "false" : "true"} required/> </label>
                  <label className={validEmail ? "valid" : "form-label"}>Email: <input type="email" name='email' onChange={(e) => setEmail(e.target.value)}/> </label>
                  <button disabled={!validName || !validPwd || !validMatch || !validEmail ? true : false}>Sign Up</button>
                  <p>Already registered? <Link to="/authorization">Sign-In</Link></p>
               </form>
    </div>
    )
  }
  </>
  )
}

export {Register}