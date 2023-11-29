import React, { useEffect, useState} from "react";
import { Link } from 'react-router-dom';

function EquipmentByName( {EquipmentName}){
    const [equipment, setEquipment] = useState([])
    const URL = `http://127.0.0.1:8080/api/equipment/name/${EquipmentName}`

    useEffect(()=>{
        fetch(URL)
        .then(response => response.json())
        .then(data => setEquipment(data))
        .catch(err => console.log(err))
    }, [])

    return(
        <div className='big-card-wrapper'>
                {equipment.map((item, index) => (
                <div key={index} className='big-card'>

                    <div className="big-card-back">
                        <Link to={"/equipments"}>↩Back</Link>
                    </div>

                    <div className="big-card-header">

                        <div className="big-card-header-img">
                            <img src={item.img}/>
                            <h1>{item.name}</h1>
                        </div>

                        <div className="big-card-header-stats">
                            <p>Rarity: {item.rarity}</p>
                            <p>Cooldown: {item.cooldown}s</p>
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

export { EquipmentByName }