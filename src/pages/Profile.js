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

    useEffect(() => {
        if (login) {
            const UserInf = JSON.parse(localStorage.getItem('userInf'))
            const URL = `http://127.0.0.1:8080/api/user/favorite/${UserInf.user_id}`
            fetch(URL)
                .then(response => response.json())
                .then(data => {
                    if (data[0]['favorite_items'] == '') {
                        setUserFavoritesItem([])
                    } else {
                        setUserFavoritesItem(data[0]['favorite_items'].split(','))
                    }
                })
                .catch(err => console.log(err))
        }
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
                    <div className="favorite-items-profile">
                        {FavoriteItems}
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
