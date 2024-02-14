import React, { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import axios from '../api/axios'

import plusIcon from '../icons/greenPlus.png'

function AdminUsers() {
    const [items, addItems] = useState([])
    const [isSearched, setSearched] = useState(false)
    const [allItems, setAllItems] = useState([])
    const [types, setTypes] = useState([])
    const [sortType, setSortType] = useState([])
    const URL = `https://node-ror2.vercel.app/api/users`

    useEffect(() => {
        checkAdmin()
        getItems()
    }, [])

    function checkAdmin(){
        if(!localStorage.getItem('userInf') || JSON.parse(localStorage.getItem('userInf')).isAdmin == 0){
            window.location.href = "/";
        }
    }

    function getItems() {
        fetch(URL)
            .then(response => response.json())
            .then(data => {
                const allitems = data.sort((a, b) => a.rarity.localeCompare(b.rarity));
                addItems(allitems)
                setAllItems(allitems)
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

                    {items.map(item => {
                            return (
                                <Link key={item.id} to={`/admin/user/${item.id}`} className='items-card'>
                                    <img src={item.img} />
                                    <p>{item.login}</p>
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

export { AdminUsers }