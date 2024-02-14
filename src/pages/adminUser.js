import React, { useEffect, useState } from "react";
import { Link, useParams } from 'react-router-dom';
import axios from '../api/axios'

import trashIcon from '../icons/trash.svg'

function AdminUser() {
    const params = useParams()
    const ItemName = params.UserId
    const [User, setUser] = useState([])

    const BASE_URL = 'https://node-ror2.vercel.app/api';

    async function getPageItem(UserId) {
        try {
            const response = await axios.get(`${BASE_URL}/user/id/${UserId}`);
            const data = response.data;
            setUser(data);
        } catch (err) {
            console.error('Failed to get page item:', err);
        }
    }


    useEffect(() => {
        checkAdmin()
        getPageItem(ItemName)
    }, [])

    function checkAdmin(){
        if(!localStorage.getItem('userInf') || JSON.parse(localStorage.getItem('userInf')).isAdmin == 0){
            window.location.href = "/";
        }
    }


    return (
        <div className='big-card-wrapper'>
            {User.map((item, index) => (
                <div key={index} className='big-card'>

                    <div className="big-card-back">
                        <Link to={"/admindashboard/users"}>↩Back</Link>
                        <button className="like-btn"><img  src={trashIcon} /></button>
                    </div>

                    <div className="big-card-header">

                        <div className="big-card-header-img">
                            <img src={item.img} />
                            <h1> {item.login} </h1>
                        </div>

                        <div className="big-card-header-stats">
                            <p>Email:  {item.email}  </p>
                            {item.admin == 1 ? (
                                <p>Admin: <input type="checkbox" checked="checked"/></p>
                            ) : (
                                <p>Admin: <input type="checkbox" /></p>
                            )}
                        </div>

                    </div>
                    
                    <div className="same-items-wrapper">
                        <button className="infChangeBtn">Save</button>
                    </div>

                </div>
            ))}
        </div>
    )
}

export { AdminUser }