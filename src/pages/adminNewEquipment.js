import React, { useEffect }from "react";
import { Link } from 'react-router-dom';
import axios from '../api/axios'

const NEWEQUIP_URL = 'https://node-ror2.vercel.app/api/add/equipment'

function AdminNewEquipment (){

    useEffect(() => {
        checkAdmin()
    }, [])

    function checkAdmin(){
        if(!localStorage.getItem('userInf') || JSON.parse(localStorage.getItem('userInf')).isAdmin == 0){
            window.location.href = "/";
        }
    }

    function saveClick() {
        const equipImg = document.getElementById('equipImg').value;
        const equipName = document.getElementById('equipName').value;
        const equipRarity = document.getElementById('equipRarity').value;
        const equipCooldown = document.getElementById('equipCooldown').value;
        const equipAbout = document.getElementById('equipAbout').innerText;
        const equipDescription = document.getElementById('equipDescription').innerText;
        const EquipInf = ({name: equipName, about: equipAbout, rarity: equipRarity, cooldown: equipCooldown, description: equipDescription, img: equipImg})
        addEquip(EquipInf)
        }

    const addEquip = async (EquipInf) => {
        try{
            const response = await axios.post(NEWEQUIP_URL, EquipInf,
             {
              headers: {"Content-Type": 'application/json'}
             });
             window.location.href = "/admindashboard/equipments";
          } catch (err){
          }
    }
    
    return(
        <div className='big-card-wrapper'>
                <div className='big-card'>

                    <div className="big-card-back">
                        <Link to={"/admindashboard/equipments"}>↩Back</Link>
                    </div>

                    <div className="big-card-header">

                        <div className="big-card-header-img">
                            <input type="text" placeholder="Equipment image URL" id="equipImg"/>
                            <h1>  <input className='itemChangeInfText' placeholder="Name" type="text" id="equipName"/> </h1>
                        </div>

                        <div className="big-card-header-stats">
                            <p>Rarity:  <input type="text" placeholder="Rarity" id="equipRarity"/> </p>
                            <p>Cooldown: <input type="text" placeholder="Cooldown" id="equipCooldown"/> s</p>
                        </div>

                    </div>

                    <div className="big-card-text">
                        <div className='itemChangeInfText' contentEditable="true" id="equipDescription">Description</div>
                    </div>

                    <div className="big-card-text">
                        <div className='itemChangeInfText' contentEditable="true" id="equipAbout"> About </div>
                    </div>

                <div className="same-items-wrapper">
                    <button className="infChangeBtn" onClick={saveClick}>Save</button>
                </div>

                </div>
        </div>
    )
}

export { AdminNewEquipment }