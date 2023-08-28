import React, { useEffect, useState, useRef, Component} from "react";
import { Link } from 'react-router-dom';


const Profile = ({getUser}) => {

if(localStorage.getItem('userInf')){
var login = JSON.parse(localStorage.getItem('userInf')).login
var email = JSON.parse(localStorage.getItem('userInf')).email
var user_img = JSON.parse(localStorage.getItem('userInf')).user_img
}
const handleClick = () =>{
    localStorage.removeItem('userInf')
    getUser('')
}
    return(
            <div className='profileCard'>
                {login ? (
                <>
                <div className="profileInf">
                    {user_img == null ? (
                    <div className="profileUploadPhoto">
                    <p>You don't have user photo.</p>
                    <Link to="/">Upload user photo</Link>
                    </div>
                    ) : (
                        <img src={user_img}/>
                    )}
                    <div className="profileUserText">
                        <div>{login}</div>
                        <div>{email}</div>
                    </div>
                </div>
                <button className='exitBtn' onClick={handleClick}>Exit</button>
                </>) : (
                <div className='profileNotAuth'>
                <div>You are not authorized</div>
                <Link to="/register">Sign-up</Link>
                </div>
                )}
            </div>
    )
}

export {Profile}
