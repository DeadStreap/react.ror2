import React, { useEffect, useState} from "react";
import { Link, useParams } from 'react-router-dom';

import trashIcon from '../icons/trash.svg'

function AdminCharacter(){
    const params = useParams()
    const CharacterName = params.CharacterName
    const [records, setRecords] = useState([])
    const URL = `https://node-ror2.vercel.app/api/character/name/${CharacterName}`

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

    function deleteItem(){}

    return(
        <div className='big-card-wrapper'>
                {records.map((item, index) => (
                <div key={index} className='big-card'>

                    <div className="big-card-back">
                        <Link to={"/admindashboard/characters"}>↩Back</Link>
                        <button className="like-btn" onClick={deleteItem}><img  src={trashIcon} /></button>
                    </div>

                    <div className="big-card-header">

                        <div className="big-card-header-img">
                            <div className='itemChangeInfText' contentEditable="true"> {item.img} </div>
                            <h1> <div className='itemChangeInfText' contentEditable="true"> {item.name} </div> </h1>
                        </div>

                        <div className="big-card-header-stats">
                            <p>Health: <div className='itemChangeInfText' contentEditable="true"> {item.health} </div> </p>
                            <p>Health regen: <div className='itemChangeInfText' contentEditable="true"> {item.health_regen} </div> </p>
                            <p>Damage: <div className='itemChangeInfText' contentEditable="true"> {item.damage} </div> </p>
                            <p>Speed: <div className='itemChangeInfText' contentEditable="true"> {item.speed} </div> </p>
                            <p>Armor: <div className='itemChangeInfText' contentEditable="true"> {item.armor} </div> </p>
                        </div>

                    </div>

                    <div className="big-card-text">
                        <div className='itemChangeInfText' contentEditable="true"> {item.description} </div>
                    </div>

                </div>
                ))}
                <div className="same-items-wrapper">
                    <button className="infChangeBtn">Save</button>
                </div>
        </div>
    )
}

export { AdminCharacter }