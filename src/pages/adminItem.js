import React, { useEffect, useState } from "react";
import { Link, useParams } from 'react-router-dom';
import axios from '../api/axios'

function AdminItem() {
    const params = useParams()
    const ItemName = params.ItemName
    const [Item, setItem] = useState([])

    const BASE_URL = 'https://node-ror2.vercel.app/api';

    async function getPageItem(getItemName) {
        try {
            const response = await axios.get(`${BASE_URL}/item/name/${getItemName}`);
            const data = response.data;
            setItem(data);
        } catch (err) {
            console.error('Failed to get page item:', err);
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
                        <Link to={"/admindashboard/items"}>↩Back</Link>
                    </div>

                    <div className="big-card-header">

                        <div className="big-card-header-img">
                            <div className='itemChangeInfText' contenteditable="true"> {item.img} </div>
                            <h1><div className='itemChangeInfText' contenteditable="true"> {item.name} </div></h1>
                        </div>

                        <div className="big-card-header-stats">
                            <p>Rarity:  <div className='itemChangeInfText' contenteditable="true"> {item.rarity} </div> </p>
                            <p>Category: <div className='itemChangeInfText' contenteditable="true"> {item.category} </div> </p>
                            <p>Stack: <div className='itemChangeInfText' contenteditable="true"> {item.stack} </div></p>
                        </div>

                    </div>

                    <div className="big-card-text">
                        <div className='itemChangeInfText' contenteditable="true"> {item.description} </div>
                    </div>
                    
                    <div className="same-items-wrapper">
                        <button className="infChangeBtn">Save</button>
                    </div>

                </div>
            ))}
        </div>
    )
}

export { AdminItem }