import React, { useEffect } from "react";
import { Link, useParams } from 'react-router-dom';

function AdminNewEquipment (){

    useEffect(() => {
        checkAdmin()
    }, [])

    function checkAdmin(){
        if(!localStorage.getItem('userInf') || JSON.parse(localStorage.getItem('userInf')).isAdmin == 0){
            window.location.href = "/";
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
                            <img />
                            <h1>  <input className='itemChangeInfText' type="text"/> </h1>
                        </div>

                        <div className="big-card-header-stats">
                            <p>Rarity:  <div className='itemChangeInfText' contenteditable="true">  </div> </p>
                            <p>Cooldown:  <div className='itemChangeInfText' contenteditable="true">  </div> s</p>
                        </div>

                    </div>

                    <div className="big-card-text">
                        <div className='itemChangeInfText' contenteditable="true"></div>
                    </div>

                </div>
                <div className="same-items-wrapper">
                    <button className="infChangeBtn">Save</button>
                </div>
        </div>
    )
}

export { AdminNewEquipment }