import React, { useEffect, useState} from "react";
import { Link, useParams } from 'react-router-dom';
import axios from '../api/axios'

import trashIcon from '../icons/trash.svg'

function AdminEquipment (){
    const params = useParams()
    const EquipmentName = params.EquipmentName
    const [equipment, setEquipment] = useState([])

    const BASE_URL = 'https://node-ror2.vercel.app/api';

    useEffect(()=>{
        checkAdmin()
        fetch(`${BASE_URL}/equipment/name/${EquipmentName}`)
        .then(response => response.json())
        .then(data => setEquipment(data))
        .catch(err => console.log(err))
    }, [])

    function checkAdmin(){
        if(!localStorage.getItem('userInf') || JSON.parse(localStorage.getItem('userInf')).isAdmin != "true"){
            window.location.href = "/";
        }
    }

    async function delItem(equipId) {
        const equipInf = ({id: equipId})
        try{
            const response = await axios.post(`${BASE_URL}/delete/equipment`, equipInf,
             {
              headers: {"Content-Type": 'application/json'}
             });
             window.location.href = "/admindashboard/equipments";
          } catch (err){
          }
    }

    function saveClick(){
        const equipImg = document.getElementById('equipImg').innerText;
        const equipName = document.getElementById('equipName').value;
        const equipRarity = document.getElementById('equipRarity').innerText;
        const equipCooldown = document.getElementById('equipCooldown').innerText;
        const equipAbout = document.getElementById('equipAbout').innerText;
        const equipDescription = document.getElementById('equipDescription').innerText;
        const itemInf = ({name: equipName, about: equipAbout, rarity: equipRarity, cooldown: equipCooldown, description: equipDescription, img: equipImg, id: equipment[0].id})
        updateItem(itemInf)
    }

    const updateItem = async (itemInf) => {
        try{
            const response = await axios.post(`${BASE_URL}/update/equipment`, itemInf,
             {
              headers: {"Content-Type": 'application/json'}
             });
             window.location.href = "/admindashboard/equipments";
          } catch (err){
          }
    }

    return(
        <div className='big-card-wrapper'>
                {equipment.map((item, index) => (
                <div key={index} className='big-card'>

                    <div className="big-card-back">
                        <Link to={"/admindashboard/equipments"}>↩Back</Link>
                        <button className="like-btn" onClick={() => delItem(item.id)}><img  src={trashIcon} /></button>
                    </div>

                    <div className="big-card-header">

                        <div className="big-card-header-img">
                            <div className='itemChangeInfText' contentEditable="true" id="equipImg"> {item.img} </div>
                            <h1>  <input className='itemChangeInfText' type="text" defaultValue={item.name} id="equipName"/> </h1>
                        </div>

                        <div className="big-card-header-stats">
                            <p>Rarity:  <div className='itemChangeInfText' contentEditable="true" id="equipRarity"> {item.rarity} </div> </p>
                            <p>Cooldown:  <div className='itemChangeInfText' contentEditable="true" id="equipCooldown"> {item.cooldown} </div> s</p>
                        </div>

                    </div>

                    <div className="big-card-text">
                        <div className='itemChangeInfText' contentEditable="true" id="equipDescription">{item.description}</div>
                    </div>

                    <div className="big-card-text">
                        <div className='itemChangeInfText' contentEditable="true" id="equipAbout">{item.about}</div>
                    </div>

                </div>
                ))}
                <div className="same-items-wrapper">
                    <button className="infChangeBtn" onClick={saveClick}>Save</button>
                </div>
        </div>
    )
}

export { AdminEquipment }