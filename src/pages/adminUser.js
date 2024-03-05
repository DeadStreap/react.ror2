import React, { useEffect, useState } from "react";
import { Link, useParams } from 'react-router-dom';
import axios from '../api/axios'

import trashIcon from '../icons/trash.svg'

function AdminUser() {
    const params = useParams()
    const ItemName = params.UserId
    const [User, setUser] = useState([])
    const [isAdmin, setAdmin] = useState();

    const BASE_URL = 'https://node-ror2.vercel.app/api';

    async function getPageItem(UserId) {
        try {
            const response = await axios.get(`${BASE_URL}/user/id/${UserId}`);
            const data = response.data;
            setUser(data);
            setAdmin(data[0].admin)
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

    function saveClick(){
        const userAdmin = document.getElementById('userAdmin').checked;
        const userInf = ({isAdmin: userAdmin, id: User[0].id})
        updateUser(userInf)
    }

    async function updateUser(userInf){
        try{
            const response = await axios.post(`${BASE_URL}/user/update/admin`, userInf,
             {
              headers: {"Content-Type": 'application/json'}
             });
             window.location.href = "/admindashboard/users";
          } catch (err){
          }
    }

    async function delUser(userId){
        const userInf = ({id: userId})
        try{
            const response = await axios.post(`${BASE_URL}/user/delete`, userInf,
             {
              headers: {"Content-Type": 'application/json'}
             });
             window.location.href = "/admindashboard/users";
          } catch (err){
          }
    }

  
    const handleChange = () => { 
          const checkbox = document.getElementById('userAdmin').checked;
          if(checkbox == false){
            setAdmin(true)
          }
          if(checkbox == true){
            setAdmin(false)
          }
        }



    return (
        <div className='big-card-wrapper'>
            {User.map((item, index) => (
                <div key={index} className='big-card'>

                    <div className="big-card-back">
                        <Link to={"/admindashboard/users"}>↩Back</Link>
                        <button className="like-btn" onClick={() => delUser(item.id)}><img  src={trashIcon} /></button>
                    </div>

                    <div className="big-card-header">

                        <div className="big-card-header-img">
                            <img src={item.img} />
                            <h1> {item.login} </h1>
                        </div>

                        <div className="big-card-header-stats">
                            <p>Email:  {item.email}  </p>
                            {isAdmin == "true" ? (
                                <p>Admin: <input type="checkbox" id="userAdmin" checked onChange={handleChange}/></p>
                            ) : (
                                <p>Admin: <input type="checkbox" id="userAdmin" onChange={handleChange}/></p>
                            )}
                        </div>

                    </div>
                    
                    <div className="same-items-wrapper">
                        <button className="infChangeBtn" onClick={saveClick}>Save</button>
                    </div>

                </div>
            ))}
        </div>
    )
}

export { AdminUser }