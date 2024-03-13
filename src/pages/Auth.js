import React, { useEffect, useState, useRef, Component } from "react";
import { Link, json } from 'react-router-dom';
import axios from '../api/axios'

const AUTH_URL = 'https://node-ror2.vercel.app/api/user/auth'

const Auth = ({ getUser }) => {
  const userRef = useRef();

  const [user, setUser] = useState('');
  const [pwd, setPwd] = useState('');
  const [ErrMsg, setErrMsg] = useState('');
  const [success, setSucess] = useState(false);

  const [login, setLogin] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const authInf = ({ login: user, password: pwd })
      const response = await axios.post(AUTH_URL, authInf,
        {
          headers: { "Content-Type": 'application/json' }
        });
      let userinf = {
        login: response.data[0]['login'],
        email: response.data[0]['email'],
        user_img: response.data[0]['img'],
        user_id: response.data[0]['id'],
        isAdmin: response.data[0]['admin']
      }
      setLogin(response.data[0]['login'])
      localStorage.setItem('userInf', JSON.stringify(userinf))
      getUser(userinf)
      setSucess(true);
    } catch (err) {
      console.log(err)
      if (!err?.response) {
        setErrMsg('No Server Response')
      } else if (err.response?.status == 409) {
        setErrMsg('Not found user with that login')
      } else if (err.response?.status == 410) {
        setErrMsg('Wrong password')
      } else {
        setErrMsg('Registration Failed')
      }
    }
  }

  return (
    <div className='auth-form'>
      {success ? (
        <div className="successForm">
          <h1>Sing-In success!</h1>
          <p>{login}</p>
          <Link to="/profile">Go profile</Link>
        </div>) : (
        <form onSubmit={handleSubmit}>
          <h1>Sign In</h1>
          <h1 className="errMsg">{ErrMsg}</h1>
          <label>Login: <input type="text" name="login" ref={userRef} onChange={(e) => setUser(e.target.value)} required /> </label>
          <label>Password: <input type="password" name='password' ref={userRef} onChange={(e) => setPwd(e.target.value)} required /> </label>
          <button>Sign In</button>
          <p>Not registered? <Link to="/register">Sign-Up</Link></p>
        </form>
      )}
    </div>
  )
}

export { Auth }
