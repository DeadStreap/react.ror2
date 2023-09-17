import React, { useEffect, useState} from "react";
import { Link , useParams} from 'react-router-dom';
import axios from '../api/axios'

import NotLikeIcon from '../icons/like-icon.svg'
import LikeIcon from '../icons/actove-like-icon.svg'


function ItemByName({ ItemName }) {
    const [Item, setItem] = useState([])
    const [sameItems, setSameItems] = useState([])
    const [likeIcon, setLikeIcon] = useState()
    const [favorite, setFavorite] = useState([])


    function getPageItem(getItemName){
        const URL = `http://127.0.0.1:8080/api/item/name/${getItemName}`
        fetch(URL)
            .then(response => response.json())
            .then(data => {
                getFavorite(data[0].id)
                setItem(data)
                getSameItems(data);
            })
            .catch(err => console.log(err))
    }

    function onItemClick(e){
        const clickedItemName = (e.target.parentNode.id)
        setSameItems([])
        getPageItem(clickedItemName)
    }

    function LikeCheck(itemId, favorite_id) {
        if (favorite_id.includes(`${itemId}`) == true) {
            setLikeIcon(LikeIcon)
        } else if (favorite_id.includes(`${itemId}`) == false) {
            setLikeIcon(NotLikeIcon)
        }
    }

    function getFavorite(itemId) {
        try {
            const UserInf = JSON.parse(localStorage.getItem('userInf'))
            const URL = `http://127.0.0.1:8080/api/user/favorite/id/${UserInf.user_id}`
            fetch(URL)
                .then(response => response.json())
                .then(data => {
                    if (data[0]['favorite_items'] != null) {
                        let id = (data[0]['favorite_items'].split(','))
                        setFavorite(id)
                        LikeCheck(itemId, data[0]['favorite_items'].split(','))
                    } else {
                        setLikeIcon(NotLikeIcon)
                    }
                })
        } catch (err) {
            console.log(err)
        }
    }

    function getSameItems(itemCategory) {
        const URL = `http://127.0.0.1:8080/api/items`
        fetch(URL)
            .then(response => response.json())
            .then(data => {
                const allItems = (data.sort((a, b) => (a.rarity > b.rarity ? 1 : ((b.rarity > a.rarity)) ? -1 : 0)))
                setSameItems(allItems)
                sameCheck(allItems, itemCategory[0])
            })
            .catch(err => console.log(err))

    }
    function sameCheck(allItems, pageItem) {
        const sameItemsArr = []
        const pageItemCategory = pageItem.category.split(',')
        allItems.map(elem => {
            const matched = pageItemCategory.filter(el => elem.category.split(',').indexOf(el) > -1);
            if(pageItemCategory.length == 1 && elem.category.split(',').length == 1 && pageItem.rarity == elem.rarity){
                if (matched.length == 1 && elem.name != pageItem.name) {
                    sameItemsArr.push(elem)
                }
            }else{
                if (matched.length > 1 && elem.name != pageItem.name) {
                    sameItemsArr.push(elem)
                }
            }
        })
        setSameItems(sameItemsArr)
    }

    function LikeClick() {
        if (likeIcon == NotLikeIcon) {
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
                    headers: { "Content-Type": 'application/json' }
                });

            setLikeIcon(LikeIcon)

        } else if (likeIcon == LikeIcon) {
            const UserInf = JSON.parse(localStorage.getItem('userInf'))

            const favorite_del = favorite
            favorite_del.map((el, index) => {
                if (el == Item[0].id) {
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
                    headers: { "Content-Type": 'application/json' }
                });
            setLikeIcon(NotLikeIcon)
        }
    }

    useEffect(() => {
        getPageItem(ItemName)
    }, [])

    return (
        <div className='big-card-wrapper'>
            {Item.map((item, index) => (
                <div key={index} className='big-card'>

                    <div className="big-card-back">
                        <Link to={"/items"}>↩Back</Link>
                        <button className="like-btn" onClick={LikeClick}><img src={likeIcon} /></button>
                    </div>

                    <div className="big-card-header">

                        <div className="big-card-header-img">
                            <img src={item.img} />
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

                        {sameItems.length != 0 ? (
                            <div className="same-items-wrapper">
                                <h1>Similar items :</h1>
                                <div className="same-items">
                                    {sameItems
                                        .map(item => {
                                            return (
                                                <Link key={item.id} id={item.name} to={`/item/${item.name}`} className='items-card' onClick={onItemClick}>
                                                    <img src={item.img} />
                                                </Link>
                                            )
                                        })
                                    }
                                </div>
                            </div>
                        ) : (
                            <div className="same-items-wrapper">
                                <h1>Similar items not found</h1>
                            </div>)}

                </div>
            ))}
        </div>
    )
}

export { ItemByName }