import React, { useEffect, useState } from "react";
import { Link, useParams } from 'react-router-dom';
import axios from '../api/axios'

import NotLikeIcon from '../icons/like-icon.svg'
import LikeIcon from '../icons/actove-like-icon.svg'

function ItemByName({ ItemName }) {
    const [Item, setItem] = useState([])
    const [sameItems, setSameItems] = useState([])
    const [likeIcon, setLikeIcon] = useState()
    const [favorite, setFavorite] = useState([])

    const BASE_URL = 'http://127.0.0.1:8080/api';

    async function getPageItem(getItemName) {
        try {
            const response = await axios.get(`${BASE_URL}/item/name/${getItemName}`);
            const data = response.data;
            getFavorite(data[0].id);
            setItem(data);
            getSameItems(data);
        } catch (err) {
            console.error('Failed to get page item:', err);
        }
    }

    function onItemClick(e) {
        const clickedItemName = (e.target.parentNode.id)
        setSameItems([])
        getPageItem(clickedItemName)
    }

    function LikeCheck(itemId, favorite_id) {
        const isFavorite = favorite_id.includes(`${itemId}`);
        setLikeIcon(isFavorite ? LikeIcon : NotLikeIcon);
    }

    async function getFavorite(itemId) {
        try {
            const UserInf = JSON.parse(localStorage.getItem('userInf'));
            const response = await axios.get(`${BASE_URL}/user/favorite/id/${UserInf.user_id}`);
            const [data] = response.data;

            if (data.favorite_items) {
                const ids = data.favorite_items.split(',');
                setFavorite(ids);
                LikeCheck(itemId, ids);
            }

        } catch (err) {
            console.error('Failed to get favorite:', err);
        }
    }
      

    async function getSameItems(itemCategory) {
        try {
            const response = await axios.get(`${BASE_URL}/items`);
            const data = response.data;
            const allItems = data.sort((a, b) => (a.rarity > b.rarity ? 1 : b.rarity > a.rarity ? -1 : 0));
            setSameItems(allItems);
            sameCheck(allItems, itemCategory[0]);
        }
        catch (err) { console.log(err); }
    }

    function sameCheck(allItems, pageItem) {
        const pageItemCategory = pageItem.category.split(',');

        const sameItemsArr = allItems.filter(elem => {
            const elemCategories = elem.category.split(',');
            const matched = pageItemCategory.filter(el => elemCategories.includes(el));
            const isSingleCategoryMatch = pageItemCategory.length === 1 && elemCategories.length === 1 && pageItem.rarity === elem.rarity && matched.length === 1;
            const isMultipleCategoryMatch = matched.length > 1;
    
            return (isSingleCategoryMatch || isMultipleCategoryMatch) && elem.name !== pageItem.name;
        });
    
        setSameItems(sameItemsArr);
    }

    async function addToFavorite() {
        const UserInf = JSON.parse(localStorage.getItem('userInf'))
        const updatedFavorite = [...favorite, `${Item[0].id}`];
        setFavorite(updatedFavorite);
        await updateFavorite(UserInf, updatedFavorite);
        setLikeIcon(LikeIcon);
    }

    async function removeFromFavorite() {
        const UserInf = JSON.parse(localStorage.getItem('userInf'))
        const updatedFavorite = favorite.filter(item => item !== `${Item[0].id}`);
        setFavorite(updatedFavorite);
        await updateFavorite(UserInf, updatedFavorite);
        setLikeIcon(NotLikeIcon);
    }

    async function updateFavorite(UserInf, updatedFavorite) {
        await axios.post(`${BASE_URL}/user/add/favorite`, {
            user_id: `${UserInf.user_id}`,
            items_id: updatedFavorite
        }, {
            headers: { "Content-Type": 'application/json' }
        });
    }

    function LikeClick() {
        likeIcon === NotLikeIcon ? addToFavorite() : removeFromFavorite();
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
                    ) : (<></>)}

                </div>
            ))}
        </div>
    )
}

export { ItemByName }