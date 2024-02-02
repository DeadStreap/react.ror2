import React, { useEffect, useState} from "react";
import { Link, useParams } from 'react-router-dom';

function AdminNewCharacter(){

    return(
        <div className='big-card-wrapper'>
                <div className='big-card'>

                    <div className="big-card-back">
                        <Link to={"/admindashboard/characters"}>↩Back</Link>
                    </div>

                    <div className="big-card-header">

                        <div className="big-card-header-img">
                            <img/>
                            <h1> <div className='itemChangeInfText' contenteditable="true">  </div> </h1>
                        </div>

                        <div className="big-card-header-stats">
                            <p>Health: <div className='itemChangeInfText' contenteditable="true"> </div> </p>
                            <p>Health regen: <div className='itemChangeInfText' contenteditable="true"> </div> </p>
                            <p>Damage: <div className='itemChangeInfText' contenteditable="true">  </div> </p>
                            <p>Speed: <div className='itemChangeInfText' contenteditable="true">  </div> </p>
                            <p>Armor: <div className='itemChangeInfText' contenteditable="true">  </div> </p>
                        </div>

                    </div>

                    <div className="big-card-text">
                        <div className='itemChangeInfText' contenteditable="true">  </div>
                    </div>

                </div>
                <div className="same-items-wrapper">
                    <button className="infChangeBtn">Save</button>
                </div>
        </div>
    )
}

export { AdminNewCharacter }