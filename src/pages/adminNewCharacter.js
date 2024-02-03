import React, { useEffect }from "react";
import { Link } from 'react-router-dom';
import axios from '../api/axios'

function AdminNewCharacter(){
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
                        <Link to={"/admindashboard/characters"}>↩Back</Link>
                    </div>

                    <div className="big-card-header">

                        <div className="big-card-header-img">
                            <input type="text" placeholder="Character image URL"/>
                            <h1><input type="text" placeholder="Name"/></h1>
                        </div>

                        <div className="big-card-header-stats">
                            <p>Health: <input type="text" placeholder="Health"/> </p>
                            <p>Health regen: <input type="text" placeholder="Health regen"/> </p>
                            <p>Damage: <input type="text" placeholder="Damage"/> </p>
                            <p>Speed: <input type="text" placeholder="Speed"/> </p>
                            <p>Armor: <input type="text" placeholder="Armor"/> </p>
                        </div>

                    </div>

                    <div className="big-card-text">
                        <div className='itemChangeInfText' contenteditable="true">Description</div>
                    </div>

                    <div className="same-items-wrapper">
                        <button className="infChangeBtn">Save</button>
                    </div>

                </div>
        </div>
    )
}

export { AdminNewCharacter }