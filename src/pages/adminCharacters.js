import React, { useEffect } from "react";
import { useState } from "react";
import { Link } from 'react-router-dom';
import { Characters } from '../components/Characters';

import plusIcon from '../icons/greenPlus.png'

function AdminCharacters() {
    const URL = `https://node-ror2.vercel.app/api/characters`

    const [characters, setCharacters] = useState([])

    useEffect(()=>{
        checkAdmin()
        fetch(URL)
        .then(response => response.json())
        .then(data => setCharacters(data))
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
                    
                    <div className='items-wrapper'>

                        <div className="items-content">
                        <Link to='/admin/newCharacter' className='items-card'>
                                <img src={plusIcon} />
                            </Link>
                            {characters.map(item => {
                                return (
                                    <Link to={`/admin/character/${item.name}`} className='characters-card' >
                                        <img src={item.img} />
                                        <p>{item.name}</p>
                                    </Link>
                                )
                            })
                            }
                        </div>

                    </div>

                </div>
            </div>
        </>

    )
}

export { AdminCharacters }