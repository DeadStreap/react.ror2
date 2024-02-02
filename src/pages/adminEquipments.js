import React, { useEffect } from "react";
import { useState } from "react";
import { Link } from 'react-router-dom';

import plusIcon from '../icons/greenPlus.png'

function AdminEquipments() {

    const [equipments, setEquipments] = useState([])
    const URL = `https://node-ror2.vercel.app/api/equipments`

    useEffect(() => {
        checkAdmin()
        fetch(URL)
            .then(response => response.json())
            .then(data => {
                const AllEquipments = data.sort((a, b) => b.rarity.localeCompare(a.rarity));
                setEquipments(AllEquipments)
            })
            .catch(err => console.log(err))
    }, [])

    function checkAdmin() {
        if (JSON.parse(localStorage.getItem('userInf')).isAdmin == 0) {
            window.location.href = "/";
        }
    }


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
                            <img src={plusIcon}/> 
                        </Link>

                        {equipments.map(item => {
                            return (
                                <Link key={item.id} to={`/admin/equipment/${item.name}`} className='equipments-card'>
                                    <img src={item.img} />
                                </Link>
                            )
                        })}

                    </div>
                </div>
            </div>
        </>

    )
}

export { AdminEquipments }