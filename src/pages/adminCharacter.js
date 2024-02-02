import React, { useEffect, useState} from "react";
import { Link, useParams } from 'react-router-dom';

function AdminCharacter(){
    const params = useParams()
    const CharacterName = params.CharacterName
    const [records, setRecords] = useState([])
    const URL = `https://node-ror2.vercel.app/api/character/name/${CharacterName}`

    useEffect(()=>{
        fetch(URL)
        .then(response => response.json())
        .then(data => setRecords(data))
        .catch(err => console.log(err))
    }, [])

    return(
        <div className='big-card-wrapper'>
                {records.map((item, index) => (
                <div key={index} className='big-card'>

                    <div className="big-card-back">
                        <Link to={"/admindashboard/characters"}>↩Back</Link>
                    </div>

                    <div className="big-card-header">

                        <div className="big-card-header-img">
                            <div className='itemChangeInfText' contenteditable="true"> {item.img} </div>
                            <h1> <div className='itemChangeInfText' contenteditable="true"> {item.name} </div> </h1>
                        </div>

                        <div className="big-card-header-stats">
                            <p>Health: <div className='itemChangeInfText' contenteditable="true"> {item.health} </div> </p>
                            <p>Health regen: <div className='itemChangeInfText' contenteditable="true"> {item.health_regen} </div> </p>
                            <p>Damage: <div className='itemChangeInfText' contenteditable="true"> {item.damage} </div> </p>
                            <p>Speed: <div className='itemChangeInfText' contenteditable="true"> {item.speed} </div> </p>
                            <p>Armor: <div className='itemChangeInfText' contenteditable="true"> {item.armor} </div> </p>
                        </div>

                    </div>

                    <div className="big-card-text">
                        <div className='itemChangeInfText' contenteditable="true"> {item.description} </div>
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