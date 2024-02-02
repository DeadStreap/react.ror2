import React, { useEffect, useState, useRef } from "react";
import { Link, useParams } from 'react-router-dom';
import axios from '../api/axios'

function AdminNewItem() {

    function saveClick() {
        const itemImg = document.getElementById('itemImg').value;
        const itemName = document.getElementById('itemName').value;
        const itemRarity = document.getElementById('itemRarity').value;
        const itemCategory = document.getElementById('itemCategory').value;
        const itemStack = document.getElementById('itemStack').value;
        const itemDescription = document.getElementById('itemDescription').innerText;
        console.log(itemImg)
        console.log(itemName)
        console.log(itemRarity)
        console.log(itemCategory)
        console.log(itemStack)
        console.log(itemDescription)
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
                        </div>

                    </div>

                    <div className="big-card-text">
                        <div className='itemChangeInfText' contenteditable="true" id="itemDescription"> Description</div>
                    </div>
                    
                    <div className="same-items-wrapper">
                        <button className="infChangeBtn" onClick={saveClick}>Save</button>
                    </div>

                </div>
        </div>
    )
}

export { AdminNewItem }