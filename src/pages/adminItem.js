import React, { useEffect, useState } from "react";
import { Link, useParams } from 'react-router-dom';
import axios from '../api/axios'

import trashIcon from '../icons/trash.svg'

function AdminItem() {
    const params = useParams()
    const ItemName = params.ItemName
    const [Item, setItem] = useState([])

    const BASE_URL = 'https://node-ror2.vercel.app/api';

    async function getPageItem(ItemName) {
        try {
            const response = await axios.get(`${BASE_URL}/item/name/${ItemName}`);
            const data = response.data;
            setItem(data);
        } catch (err) {
            console.error('Failed to get page item:', err);
        }
    }


    useEffect(() => {
        checkAdmin()
        getPageItem(ItemName)
    }, [])

    function checkAdmin(){
        if(!localStorage.getItem('userInf') || JSON.parse(localStorage.getItem('userInf')).isAdmin != "true"){
            window.location.href = "/";
        }
    }

    async function delItem(itemId) {
        const itemInf = ({id: itemId})
        try{
            const response = await axios.post(`${BASE_URL}/delete/item`, itemInf,
             {
              headers: {"Content-Type": 'application/json'}
             });
             window.location.href = "/admindashboard/items";
          } catch (err){
          }
    }

    function saveClick(){
        const itemImg = document.getElementById('itemImg').innerText;
        const itemName = document.getElementById('itemName').innerText;
        const itemRarity = document.getElementById('itemRarity').innerText;
        const itemCategory = document.getElementById('itemCategory').innerText;
        const itemStack = document.getElementById('itemStack').innerText;
        const itemFromDLC = document.getElementById('itemFromDLC').checked;
        const itemAbout = document.getElementById('itemAbout').innerText;
        const itemDescription = document.getElementById('itemDescription').innerText;
        const itemInf = ({name: itemName, about: itemAbout, rarity: itemRarity, category: itemCategory, stack: itemStack, description: itemDescription, FromDLC: itemFromDLC, img: itemImg, id: Item[0].id})
        updateItem(itemInf)
    }

    const updateItem = async (itemInf) => {
        try{
            const response = await axios.post(`${BASE_URL}/update/item`, itemInf,
             {
              headers: {"Content-Type": 'application/json'}
             });
             window.location.href = "/admindashboard/items";
          } catch (err){
          }
    }

    return (
        <div className='big-card-wrapper'>
            {Item.map((item, index) => (
                <div key={index} className='big-card'>

                    <div className="big-card-back">
                        <Link to={"/admindashboard/items"}>↩Back</Link>
                        <button className="like-btn" onClick={() => delItem(item.id)}><img  src={trashIcon} /></button>
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
                            {item.FromDLC == 'true' ? (
                                <p>FromDLC: <input type="checkbox" id="itemFromDLC" checked="checked"/></p>
                            ) : (
                                <p>FromDLC: <input type="checkbox" id="itemFromDLC"/></p>
                            )}
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