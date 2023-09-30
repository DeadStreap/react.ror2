import React, { useEffect, useState, useRef, Component } from "react";
import { Link } from 'react-router-dom';
import { FavoriteItem } from '../components/FavoriteItem';


const Profile = ({ getUser }) => {

    if (localStorage.getItem('userInf')) {
        var login = JSON.parse(localStorage.getItem('userInf')).login
        var email = JSON.parse(localStorage.getItem('userInf')).email
        var user_img = JSON.parse(localStorage.getItem('userInf')).user_img
    }
    const handleClick = () => {
        localStorage.removeItem('userInf')
        getUser('')
    }

    const [userFavoritesItem, setUserFavoritesItem] = useState([])

    async function getFavorites() {
        if (!login) return;
        
        const userInfoString = localStorage.getItem('userInf');
        
        if (!userInfoString) return;

        const { user_id } = JSON.parse(userInfoString);
        const URL = `http://127.0.0.1:8080/api/user/favorite/all/${user_id}`;
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

    const FavoriteItems = userFavoritesItem.map((item, index) => 
        <FavoriteItem key={index} item={item} />
    )
    return (
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
                            <img src={user_img} />
                        )}
                        <div className="profileUserText">
                            <div>{login}</div>
                            <div>{email}</div>
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
