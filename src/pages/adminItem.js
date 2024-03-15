import React, { useEffect, useState } from "react";
import { Link, useParams } from 'react-router-dom';
import axios from '../api/axios'

import trashIcon from '../icons/trash.svg'

function AdminItem() {
    const params = useParams()
    const ItemName = params.ItemName
    const [Item, setItem] = useState([])

    const BASE_URL = 'https://node-ror2.vercel.app/api';

    useEffect(() => {
        checkAdmin()
        getPageItem(ItemName)
    }, [])

    async function getPageItem(ItemName) {
        try {
            const response = await axios.get(`${BASE_URL}/item/name/${ItemName}`);
            setItem(response.data);
        } catch (err) {
            console.error('Failed to get page item:', err);
        }
    }

    function checkAdmin(){
        if(!localStorage.getItem('userInf') || JSON.parse(localStorage.getItem('userInf')).isAdmin != "true"){
            window.location.href = "/";
        }
    }

    const delItem = async (itemId) => {
        try {
            await axios.post(`${BASE_URL}/delete/item`, { id: itemId }, { headers: { "Content-Type": 'application/json' } });
            window.location.href = "/admindashboard/items";
        } catch (err) {
            console.error(err);
        }
    };

    const saveClick = () => {
        const updatedItem = {
            name: document.getElementById('itemName').innerText,
            about: document.getElementById('itemAbout').innerText,
            rarity: document.getElementById('itemRarity').innerText,
            category: document.getElementById('itemCategory').innerText,
            stack: document.getElementById('itemStack').innerText,
            description: document.getElementById('itemDescription').innerText,
            FromDLC: document.getElementById('itemFromDLC').checked,
            img: document.getElementById('itemImg').innerText,
            id: Item[0].id
        };
        updateItem(updatedItem);
    };

    const updateItem = async (itemInfo) => {
        try {
            await axios.post(`${BASE_URL}/update/item`, itemInfo, { headers: { "Content-Type": 'application/json' } });
            window.location.href = "/admindashboard/items";
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div className='big-card-wrapper'>
            {Item.map((item, index) => (
                <div key={index} className='big-card'>

                    <div className="big-card-back">
                        <Link to={"/admindashboard/items"}>↩Back</Link>
                        <button className="like-btn" onClick={() => delItem(item.id)}>
                            <img  src={trashIcon} />
                        </button>
                    </div>

                    <div className="big-card-header">

                        <div className="big-card-header-img">
                            <div className='itemChangeInfText' contentEditable="true" id='itemImg'> {item.img} </div>
                            <h1><div className='itemChangeInfText' contentEditable="true" id='itemName'> {item.name} </div></h1>
                        </div>

                        <div className="big-card-header-stats">
                            <p>Rarity:  <div className='itemChangeInfText' contentEditable="true" id='itemRarity' > {item.rarity} </div> </p>
                            <p>Category: <div className='itemChangeInfText' contentEditable="true" id='itemCategory'>  {item.category} </div> </p>
                            <p>Stack: <div className='itemChangeInfText' contentEditable="true" id='itemStack'> {item.stack} </div></p>
                            <p>FromDLC: <input type="checkbox" id="itemFromDLC" defaultChecked={item.FromDLC === 'true'} /></p>
                        </div>

                    </div>

                    <div className="big-card-text">
                        <p>Description</p>
                        <div className='itemChangeInfText' contentEditable="true" id='itemDescription'> {item.description} </div>
                    </div>

                    <div className="big-card-text">
                        <p>About</p>
                        <div className='itemChangeInfText' contentEditable="true" id="itemAbout"> {item.about} </div>
                    </div>
                    
                    <div className="same-items-wrapper">
                        <button className="infChangeBtn" onClick={saveClick}>Save</button>
                    </div>

                </div>
            ))}
        </div>
    )
}

export { AdminItem }