import React, { useEffect, useState} from "react";
import { Link, useParams } from 'react-router-dom';

function AdminEquipment (){
    const params = useParams()
    const EquipmentName = params.EquipmentName
    const [equipment, setEquipment] = useState([])
    const URL = `https://node-ror2.vercel.app/api/equipment/name/${EquipmentName}`

    useEffect(()=>{
        checkAdmin()
        fetch(URL)
        .then(response => response.json())
        .then(data => setEquipment(data))
        .catch(err => console.log(err))
    }, [])

    function checkAdmin(){
        if(!localStorage.getItem('userInf') || JSON.parse(localStorage.getItem('userInf')).isAdmin == 0){
            window.location.href = "/";
        }
    }

    return(
        <div className='big-card-wrapper'>
                {equipment.map((item, index) => (
                <div key={index} className='big-card'>

                    <div className="big-card-back">
                        <Link to={"/admindashboard/equipments"}>↩Back</Link>
                    </div>

                    <div className="big-card-header">

                        <div className="big-card-header-img">
                            <div className='itemChangeInfText' contenteditable="true"> {item.img} </div>
                            <h1>  <input className='itemChangeInfText' type="text" defaultValue={item.name}/> </h1>
                        </div>

                        <div className="big-card-header-stats">
                            <p>Rarity:  <div className='itemChangeInfText' contenteditable="true"> {item.rarity} </div> </p>
                            <p>Cooldown:  <div className='itemChangeInfText' contenteditable="true"> {item.cooldown} </div> s</p>
                        </div>

                    </div>

                    <div className="big-card-text">
                        <div className='itemChangeInfText' contenteditable="true">{item.description}</div>
                    </div>

                </div>
                ))}
                <div className="same-items-wrapper">
                    <button className="infChangeBtn">Save</button>
                </div>
        </div>
    )
}

export { AdminEquipment }