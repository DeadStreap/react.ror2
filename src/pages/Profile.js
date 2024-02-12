import React, { useEffect, useState, useRef, Component } from "react";
import { Link } from 'react-router-dom';
import { FavoriteItem } from '../components/FavoriteItem';
import AvatarPopup from "../components/AvatarPopup";
import axios from '../api/axios'


const Profile = ({ getUser }) => {

    const [modalActive, setModalActive] = useState(false)

    if (localStorage.getItem('userInf')) {
        var login = JSON.parse(localStorage.getItem('userInf')).login
        var email = JSON.parse(localStorage.getItem('userInf')).email
        var user_img = JSON.parse(localStorage.getItem('userInf')).user_img
        var user_id = JSON.parse(localStorage.getItem('userInf')).user_id
        var isAdmin = JSON.parse(localStorage.getItem('userInf')).isAdmin
    }

    const [userImg, setUserImg] = useState(user_img)

    const handleClick = () => {
        localStorage.removeItem('userInf')
        setUserImg()
        getUser('')
    }

    const [userFavoritesItem, setUserFavoritesItem] = useState([])

    async function getFavorites() {
        if (!login) return;
        
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
    }, [])

    async function avatarDelete() {
        try{
            const UpadateAvatarURL = 'https://node-ror2.vercel.app/api/user/delete/avatar'
            const url = ({id: user_id})
            const response = await axios.post(UpadateAvatarURL, url,
             {
              headers: {"Content-Type": 'application/json'}
             });
             let userinf = {
              login: login,
              email: email,
              user_img: null,
              user_id: user_id
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
            {login ? (
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
                            <div>{login}</div>
                            <div>{email}</div>
                            {isAdmin ? (<Link to="/admindashboard/items">Go admin panel</Link>) : (<></>)}
                        </div>

                    </div>
                    <div className="profile-favorite-items">
                        <h1>Favotite Items:</h1>
                        <div className="favorite-items-wrapper">
                        {FavoriteItems}
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

export { Profile }
