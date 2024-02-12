import React, { useEffect, useState} from "react";
import { Link, useParams } from 'react-router-dom';
import axios from '../api/axios'

import trashIcon from '../icons/trash.svg'

function AdminCharacter(){
    const params = useParams()
    const CharacterName = params.CharacterName
    const [records, setRecords] = useState([])
    const URL = `https://node-ror2.vercel.app/api/character/name/${CharacterName}`
    const BASE_URL = 'https://node-ror2.vercel.app/api';

    useEffect(()=>{
        checkAdmin()
        fetch(URL)
        .then(response => response.json())
        .then(data => setRecords(data))
        .catch(err => console.log(err))
    }, [])

    function checkAdmin(){
        if(!localStorage.getItem('userInf') || JSON.parse(localStorage.getItem('userInf')).isAdmin == 0){
            window.location.href = "/";
        }
    }

    async function delItem(itemId) {
        const itemInf = ({id: itemId})
        try{
            const response = await axios.post(`${BASE_URL}/delete/character`, itemInf,
             {
              headers: {"Content-Type": 'application/json'}
             });
             window.location.href = "/admindashboard/characters";
          } catch (err){
          }
    }


    function saveClick(){
        const characterImg = document.getElementById('characterImg').innerText;
        const characterName = document.getElementById('characterName').innerText;
        const characterHealth = document.getElementById('characterHealth').innerText;
        const characterHealthRegen = document.getElementById('characterHealthRegen').innerText;
        const characterDamage = document.getElementById('characterDamage').innerText;
        const characterSpeed = document.getElementById('characterSpeed').innerText;
        const characterArmor = document.getElementById('characterArmor').innerText;
        const characterDescription = document.getElementById('characterDescription').innerText;
        const characterAbout = document.getElementById('characterAbout').innerText;
        const characterInf = ({name: characterName, health: characterHealth, healthRegen: characterHealthRegen, damage: characterDamage, speed: characterSpeed, armor: characterArmor, about: characterAbout, description: characterDescription, img: characterImg, id: records[0].id})
        updateCharacter(characterInf)
    }

    const updateCharacter = async (characterInf) => {
        try{
            const response = await axios.post(`${BASE_URL}/update/character`, characterInf,
             {
              headers: {"Content-Type": 'application/json'}
             });
             window.location.href = "/admindashboard/characters";
          } catch (err){
          }
    }

 

    return(
        <div className='big-card-wrapper'>
                {records.map((item, index) => (
                <div key={index} className='big-card'>

                    <div className="big-card-back">
                        <Link to={"/admindashboard/characters"}>↩Back</Link>
                        <button className="like-btn" onClick={() => delItem(item.id)}><img  src={trashIcon} /></button>
                    </div>

                    <div className="big-card-header">

                        <div className="big-card-header-img">
                            <div className='itemChangeInfText' contentEditable="true" id="characterImg"> {item.img} </div>
                            <h1> <div className='itemChangeInfText' contentEditable="true" id="characterName"> {item.name} </div> </h1>
                        </div>

                        <div className="big-card-header-stats">
                            <p>Health: <div className='itemChangeInfText' contentEditable="true" id="characterHealth"> {item.health} </div> </p>
                            <p>Health regen: <div className='itemChangeInfText' contentEditable="true" id="characterHealthRegen"> {item.health_regen} </div> </p>
                            <p>Damage: <div className='itemChangeInfText' contentEditable="true" id="characterDamage"> {item.damage} </div> </p>
                            <p>Speed: <div className='itemChangeInfText' contentEditable="true" id="characterSpeed"> {item.speed} </div> </p>
                            <p>Armor: <div className='itemChangeInfText' contentEditable="true" id="characterArmor"> {item.armor} </div> </p>
                        </div>

                    </div>

                    <div className="big-card-text">
                        <p>Description</p>
                        <div className='itemChangeInfText' contentEditable="true" id='characterDescription'> {item.description} </div>
                    </div>

                    <div className="big-card-text">
                        <p>About</p>
                        <div className='itemChangeInfText' contentEditable="true" id="characterAbout"> {item.about} </div>
                    </div>

                    <div className="same-items-wrapper">
                        <button className="infChangeBtn" onClick={saveClick}>Save</button>
                    </div>

                </div>
                ))}
        </div>
    )
}

export { AdminCharacter }