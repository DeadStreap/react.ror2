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
        userInfo = {
            login,
            email,
            user_img,
            user_id,
            isAdmin
         };
    }

    const [userImg, setUserImg] = useState(userInfo.user_img)

    const exitClick = () => {
        localStorage.removeItem('userInf')
        setUserImg(null)
        getUser('')
    }

    const [userFavoritesItem, setUserFavoritesItem] = useState([])

    const getUserInf = async () => {
        try {
            const response = await fetch(`https://node-ror2.vercel.app/api/user/id/${userInfo.user_id}`);
            const data = await response.json();
            updateUserInfo(data[0].login, data[0].email, data[0].img, data[0].id, data[0].admin);
            localStorage.setItem('userInf', JSON.stringify(userInfo));
        } catch (err) {
            console.error('Failed to fetch UserInfo:', err);
        }
    };

    async function getFavorites() {
        const { login, user_id } = userInfo;
        const userInfoString = localStorage.getItem('userInf');

        if (!login || !user_id || !userInfoString) return;

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
        getFavorites();
        setTimeout(getUserInf, 1000);
    }, [])

    const avatarDelete = async () => {
        try {
            await axios.post('https://node-ror2.vercel.app/api/user/delete/avatar', { id: userInfo.user_id }, {
                headers: { "Content-Type": 'application/json' }
            });

            const updatedUserInfo = {
                ...userInfo,
                user_img: null
            };

            localStorage.setItem('userInf', JSON.stringify(updatedUserInfo));
            setUserImg(null);
        } catch (err) {
            console.error('Failed to delete avatar:', err);
        }
    };

    const FavoriteItems = userFavoritesItem.map((item, index) => 
        <FavoriteItem key={index} item={item} />
    )

    return (
        <div className='profileCard'>
            {userInfo.login ? (
                <>
                    <div className="profileInf">
                        {userImg ? (
                            <img src={userImg} onClick={avatarDelete} />
                        ) : (
                            <div className="profileUploadPhoto">
                                <p>You don't have user photo.</p>
                                <button onClick={() => setModalActive(true)}>Upload user photo</button>
                                <AvatarPopup active={modalActive} setActive={setModalActive} setUserImg={setUserImg} />
                            </div>
                        )}
                        <div className="profileUserText">
                            <div>{userInfo.login}</div>
                            <div>{userInfo.email}</div>
                            {userInfo.isAdmin === "true" && <Link to="/admindashboard/items">Go admin panel</Link>}
                        </div>
                    </div>
                    <div className="profile-favorite-items">
                        <h1>Favorite Items:</h1>
                        <div className="favorite-items-wrapper">
                            {FavoriteItems}
                        </div>
                    </div>
                    <button className='exitBtn' onClick={exitClick}>Exit</button>
                </>
            ) : (
                <div className='profileNotAuth'>
                    <div>You are not authorized</div>
                    <Link to="/register">Sign-up</Link>
                </div>
            )}
        </div>
    );
};

export { Profile }
