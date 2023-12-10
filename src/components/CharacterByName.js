import React, { useEffect, useState} from "react";
import { Link } from 'react-router-dom';

function CharacterByName( {CharacterName}){
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
                        <Link to={"/characters"}>↩Back</Link>
                    </div>

                    <div className="big-card-header">

                        <div className="big-card-header-img">
                            <img src={item.img}/>
                            <h1>{item.name}</h1>
                        </div>

                        <div className="big-card-header-stats">
                            <p>Health: {item.health}</p>
                            <p>Health regen: {item.health_regen}</p>
                            <p>Damage: {item.damage}</p>
                            <p>Speed: {item.speed}</p>
                            <p>Armor: {item.armor}</p>
                            <p>Damage: {item.damage}</p>
                        </div>

                    </div>

                    <div className="big-card-text">
                        <p>{item.description}</p>
                    </div>

                </div>
                ))}
        </div>
    )
}

export { CharacterByName }