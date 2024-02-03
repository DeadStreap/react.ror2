import React, { useEffect } from "react";
import { Link } from 'react-router-dom';
import axios from '../api/axios'

const NEWITEM_URL = 'https://node-ror2.vercel.app/api/add/item'

function AdminNewItem() {

    useEffect(() => {
        checkAdmin()
    }, [])

    function checkAdmin(){
        if(!localStorage.getItem('userInf') || JSON.parse(localStorage.getItem('userInf')).isAdmin == 0){
            window.location.href = "/";
        }
    }

    function saveClick() {
        const itemImg = document.getElementById('itemImg').value;
        const itemName = document.getElementById('itemName').value;
        const itemRarity = document.getElementById('itemRarity').value;
        const itemCategory = document.getElementById('itemCategory').value;
        const itemStack = document.getElementById('itemStack').value;
        const itemFromDLC = document.getElementById('itemFromDLC').checked;
        const itemAbout = document.getElementById('itemAbout').innerText;
        const itemDescription = document.getElementById('itemDescription').innerText;
        const itemInf = ({name: itemName, about: itemAbout, rarity: itemRarity, category: itemCategory, stack: itemStack, description: itemDescription, FromDLC: itemFromDLC, img: itemImg})
        addItem(itemInf)
        }

    const addItem = async (itemInf) => {
        try{
            const response = await axios.post(NEWITEM_URL, itemInf,
             {
              headers: {"Content-Type": 'application/json'}
             });
             window.location.href = "/admindashboard/items";
          } catch (err){
          }
    }

    return (
        <div className='big-card-wrapper'>
                <div className='big-card'>

                    <div className="big-card-back">
                        <Link to={"/admindashboard/items"}>↩Back</Link>
                    </div>

                    <div className="big-card-header">

                        <div className="big-card-header-img">
                            <input type="text" placeholder="Item image URL" id="itemImg"/>
                            <h1><input type="text" placeholder="Name" id="itemName"/></h1>
                        </div>

                        <div className="big-card-header-stats">
                            <p>Rarity: <input type="text" placeholder="Rarity" id="itemRarity"/> </p>
                            <p>Category: <input type="text" placeholder="Category" id="itemCategory"/> </p>
                            <p>Stack: <input type="text" placeholder="Stack" id="itemStack"/></p>
                            <p>FromDLC: <input type="checkbox" id="itemFromDLC" /></p>
                        </div>

                    </div>

                    <div className="big-card-text">
                        <div className='itemChangeInfText' contenteditable="true" id="itemDescription"> Description</div>
                    </div>

                    <div className="big-card-text">
                        <div className='itemChangeInfText' contenteditable="true" id="itemAbout"> About </div>
                    </div>
                    
                    <div className="same-items-wrapper">
                        <button className="infChangeBtn" onClick={saveClick}>Save</button>
                    </div>

                </div>
        </div>
    )
}

export { AdminNewItem }