import React, { useEffect }from "react";
import { Link } from 'react-router-dom';
import axios from '../api/axios'

const NEWCHAR_URL = 'https://node-ror2.vercel.app/api/add/character'

function AdminNewCharacter(){
    useEffect(() => {
        checkAdmin()
    }, [])

    function checkAdmin(){
        if(!localStorage.getItem('userInf') || JSON.parse(localStorage.getItem('userInf')).isAdmin != "true"){
            window.location.href = "/";
        }
    }

function saveClick() {
        const charImg = document.getElementById('charImg').value;
        const charName = document.getElementById('charName').value;
        const charHealth = document.getElementById('charHealth').value;
        const charHealthReg = document.getElementById('charHealthReg').value;
        const charDamage = document.getElementById('charDamage').value;
        const charSpeed = document.getElementById('charSpeed').value;
        const charArmor = document.getElementById('charArmor').value;
        const charDescription = document.getElementById('charDescription').innerText;
        const charAbout = document.getElementById('charAbout').innerText;
        const charInf = ({name: charName, health: charHealth, healthRegen: charHealthReg, damage: charDamage, speed: charSpeed, armor: charArmor, about: charAbout, description: charDescription, img: charImg})
        addItem(charInf)
        }

    const addItem = async (charInf) => {
        try{
            const response = await axios.post(NEWCHAR_URL, charInf,
             {
              headers: {"Content-Type": 'application/json'}
             });
             window.location.href = "/admindashboard/characters";
          } catch (err){
          }
}

    return(
        <div className='big-card-wrapper'>
                <div className='big-card'>

                    <div className="big-card-back">
                        <Link to={"/admindashboard/characters"}>↩Back</Link>
                    </div>

                    <div className="big-card-header">

                        <div className="big-card-header-img">
                            <input type="text" placeholder="Character image URL" id="charImg"/>
                            <h1><input type="text" placeholder="Name" id="charName"/></h1>
                        </div>

                        <div className="big-card-header-stats">
                            <p>Health: <input type="text" placeholder="Health" id="charHealth"/> </p>
                            <p>Health regen: <input type="text" placeholder="Health regen" id="charHealthReg"/> </p>
                            <p>Damage: <input type="text" placeholder="Damage" id="charDamage"/> </p>
                            <p>Speed: <input type="text" placeholder="Speed" id="charSpeed"/> </p>
                            <p>Armor: <input type="text" placeholder="Armor" id="charArmor"/> </p>
                        </div>

                    </div>

                    <div className="big-card-text">
                        <div className='itemChangeInfText' contentEditable="true" id="charDescription">Description</div>
                    </div>

                    <div className="big-card-text">
                        <div className='itemChangeInfText' contentEditable="true" id="charAbout"> About </div>
                    </div>

                    <div className="same-items-wrapper">
                        <button className="infChangeBtn" onClick={saveClick}>Save</button>
                    </div>

                </div>
        </div>
    )
}

export { AdminNewCharacter }