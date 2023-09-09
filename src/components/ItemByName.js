import React, { useEffect } from "react";
import { useState } from "react";
import { Link } from 'react-router-dom';
import axios from '../api/axios'

import NotLikeIcon from '../icons/like-icon.svg'
import LikeIcon from '../icons/actove-like-icon.svg'


function ItemByName( {ItemName}){
    const [Item, setItem] = useState([])
    const [likeIcon, setLikeIcon] = useState()
    const [favorite, setFavorite] = useState([])
    const URL = `http://127.0.0.1:8080/api/item/name/${ItemName}`


    function LikeCheck(itemId, favorite_id){
        if(favorite_id.includes(`${itemId}`) == true){
            setLikeIcon(LikeIcon)
        }else if(favorite_id.includes(`${itemId}`) == false){
            setLikeIcon(NotLikeIcon)
        }
    }

    function getFavorite(itemId){
        try{
            const UserInf = JSON.parse(localStorage.getItem('userInf'))
            const URL = `http://127.0.0.1:8080/api/user/favorite/${UserInf.user_id}`
            fetch(URL)
            .then(response => response.json())
            .then(data => {
                if(data[0]['favorite_items'] != null){
                    let id = (data[0]['favorite_items'].split(','))
                    setFavorite(id)
                    LikeCheck(itemId, data[0]['favorite_items'].split(','))
                }else{
                    setLikeIcon(NotLikeIcon)
                }
            })
          }catch (err){
            console.log(err)
          }
    }

    function LikeClick(){
        if(likeIcon == NotLikeIcon){
            const UserInf = JSON.parse(localStorage.getItem('userInf'))
            const favorite_add = favorite
            favorite_add.push(`${Item[0].id}`)
            setFavorite(favorite_add)

            const URL = `http://127.0.0.1:8080/api/user/add/favorite`
            const post_inf = {
                user_id: `${UserInf.user_id}`,
                items_id: favorite
            }
            const response = axios.post(URL, post_inf,
                {
                 headers: {"Content-Type": 'application/json'}
                });
            
            setLikeIcon(LikeIcon)

        }else if(likeIcon == LikeIcon){
            const UserInf = JSON.parse(localStorage.getItem('userInf'))

                const favorite_del = favorite
                favorite_del.map((el, index) => {
                    if(el == Item[0].id){
                        favorite_del.splice(index, 1)
                    }
                })
                setFavorite(favorite_del)

                const URL = `http://127.0.0.1:8080/api/user/add/favorite`
                const post_inf = {
                    user_id: `${UserInf.user_id}`,
                    items_id: favorite
                }
                const response = axios.post(URL, post_inf,
                 {
                  headers: {"Content-Type": 'application/json'}
                 });
            setLikeIcon(NotLikeIcon)
        }
    }

    useEffect(()=>{
        fetch(URL)
        .then(response => response.json())
        .then(data => {
            getFavorite(data[0].id)
            setItem(data)
        })
        .catch(err => console.log(err))
    }, [])

    return(
        <div className='big-card-wrapper'>
                {Item.map((item, index) => (
                <div key={index} className='big-card'>

                    <div className="big-card-back">
                        <Link to={"/items"}>↩Back</Link>
                        <button className="like-btn" onClick={LikeClick}><img src={likeIcon}/></button>
                    </div>

                    <div className="big-card-header">

                        <div className="big-card-header-img">
                            <img src={item.img}/>
                            <h1>{item.name}</h1>
                        </div>

                        <div className="big-card-header-stats">
                            <p>Rarity:  {item.rarity}</p>
                            <p>Category: {item.category}</p>
                            <p>Stack: {item.stack}</p>
                        </div>

                    </div>

                    <div className="big-card-text">
                        <p>{item.description}</p>
                    </div>

                </div>
                ))}
        </div>
    )
}

export { ItemByName }