import React, { useEffect, useState, useRef, Component } from "react";
import { Link } from 'react-router-dom';
import { FavoriteItem } from '../components/FavoriteItem';
import AvatarPopup from "../components/AvatarPopup";
import axios from '../api/axios'


const Profile = ({ getUser }) => {

    const [modalActive, setModalActive] = useState(false)

    var userInfo = {};

    if (localStorage.getItem('userInf')) {
        updateUserInfo(JSON.parse(localStorage.getItem('userInf')).login, JSON.parse(localStorage.getItem('userInf')).email, JSON.parse(localStorage.getItem('userInf')).user_img, JSON.parse(localStorage.getItem('userInf')).user_id, JSON.parse(localStorage.getItem('userInf')).isAdmin)
    }

    function updateUserInfo(login, email, user_img, user_id, isAdmin){
        userInfo.login = login
        userInfo.email = email
        userInfo.user_img = user_img
        userInfo.user_id = user_id
        userInfo.isAdmin = isAdmin
        console.log(userInfo.isAdmin)
    }

    const [userImg, setUserImg] = useState(userInfo.user_img)

    const exitClick = () => {
        localStorage.removeItem('userInf')
        setUserImg()
        getUser('')
    }

    const [userFavoritesItem, setUserFavoritesItem] = useState([])

    async function getUserInf(){
       const URL = `https://node-ror2.vercel.app/api/user/id/${userInfo.user_id}`;
        try {
            const response = await fetch(URL);
            const data = await response.json();
            updateUserInfo(data[0].login, data[0].email, data[0].img, data[0].id, data[0].admin)
            let userinf = {
                login: data[0].login,
                email: data[0].email,
                user_img: data[0].img,
                user_id: data[0].id,
                isAdmin: data[0].admin
              }
            localStorage.setItem('userInf', JSON.stringify(userinf))
        } catch (err) {
            console.error('Failed to fetch UserInfo:', err);
        }
    }

    async function getFavorites() {
        if (!userInfo.login) return;
        
        const userInfoString = localStorage.getItem('userInf');
        
        if (!userInfoString) return;

        const { user_id } = JSON.parse(userInfoString);
        const URL = `https://node-ror2.vercel.app/api/user/favorite/all/${user_id}`;
        try {
            const response = await fetch(URL);
            const data = await response.json();
            setUserFavoritesItem(data);
        } catch (err) {
            console.error('Failed to fetch favorites:', err);
        }
    }
    useEffect(() => {
        getFavorites()
        getUserInf()
    }, [])

    async function avatarDelete() {
        try{
            const UpadateAvatarURL = 'https://node-ror2.vercel.app/api/user/delete/avatar'
            const url = ({id: userInfo.user_id})
            const response = await axios.post(UpadateAvatarURL, url,
             {
              headers: {"Content-Type": 'application/json'}
             });
             let userinf = {
              login: userInfo.login,
              email: userInfo.email,
              user_img: null,
              user_id: userInfo.user_id
            }
            localStorage.setItem('userInf', JSON.stringify(userinf))
            setUserImg(null)
          } catch (err){
              console.error('Failed to fetch favorites:', err);
          }
    }

    const FavoriteItems = userFavoritesItem.map((item, index) => 
        <FavoriteItem key={index} item={item} />
    )
    return (
        <div className='profileCard'>
            {userInfo.login ? (
                <>
                    <div className="profileInf">

                        {userImg == null ? (
                            <div className="profileUploadPhoto">
                                <p>You don't have user photo.</p>
                                <button onClick={() => setModalActive(true)}>Upload user photo</button>
                                <AvatarPopup active={modalActive} setActive={setModalActive} setUserImg={setUserImg}/>
                            </div>
                        ) : (
                            <img src={userImg} onClick={avatarDelete}/>
                        )}
                        <div className="profileUserText">
                            <div>{userInfo.login}</div>
                            <div>{userInfo.email}</div>
                            {userInfo.isAdmin == "true" ? (<Link to="/admindashboard/items">Go admin panel</Link>) : (<></>)}
                        </div>

                    </div>
                    <div className="profile-favorite-items">
                        <h1>Favotite Items:</h1>
                        <div className="favorite-items-wrapper">
                        {FavoriteItems}
                        </div>
                    </div>
                    <button className='exitBtn' onClick={exitClick}>Exit</button>
                </>) : (
                <div className='profileNotAuth'>
                    <div>You are not authorized</div>
                    <Link to="/register">Sign-up</Link>
                </div>
            )}
        </div>
    )
}

export { Profile }
