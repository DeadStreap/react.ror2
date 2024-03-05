import React, { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import axios from '../api/axios'

import plusIcon from '../icons/greenPlus.png'

function AdminItems() {
    const [items, addItems] = useState([])
    const URL = `https://node-ror2.vercel.app/api/items`

    useEffect(() => {
        checkAdmin()
        getItems()
    }, [])
    
    function checkAdmin(){
        if(!localStorage.getItem('userInf') || JSON.parse(localStorage.getItem('userInf')).isAdmin != "true"){
            window.location.href = "/";
        }
    }
    
    function getItems() {
        fetch(URL)
            .then(response => response.json())
            .then(data => {
                const allitems = data.sort((a, b) => a.rarity.localeCompare(b.rarity));
                addItems(allitems)
            })
            .catch(err => console.log(err))
    }


    const ItemLink = ({ item, isSearched }) => (
        <Link key={item.id} to={`/item/${item.name}`} className='items-card' >
            <img src={item.img} />
            {isSearched && <div>{item.name}</div>}
        </Link>
    )

    return (
        <>
            <div className='admin-dashboard-wrapper'>

                <div className='admin-dashboard-menu'>
                    <Link to="/admindashboard/characters">Characters</Link>
                    <Link to="/admindashboard/items">Items</Link>
                    <Link to="/admindashboard/equipments">Equipment</Link>
                    <Link to="/admindashboard/users">Users</Link>
                </div>


                <div className='items-wrapper'>
                    <div className="items-content">

                        <Link to='/admin/newItem' className='items-card'>
                            <img src={plusIcon} />
                        </Link>

                        {items.map(item => {
                            return (
                                <Link key={item.id} to={`/admin/item/${item.name}`} className='items-card'>
                                    <img src={item.img} />
                                </Link>
                            )
                        })
                        }

                    </div>
                </div>
            </div>
        </>

    )
}

export { AdminItems }