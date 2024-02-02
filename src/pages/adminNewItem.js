import React, { useEffect, useState } from "react";
import { Link, useParams } from 'react-router-dom';
import axios from '../api/axios'

function AdminNewItem() {

    return (
        <div className='big-card-wrapper'>
                <div className='big-card'>

                    <div className="big-card-back">
                        <Link to={"/admindashboard/items"}>↩Back</Link>
                    </div>

                    <div className="big-card-header">

                        <div className="big-card-header-img">
                            <input type="text" placeholder="Item URL"/>
                            <h1><input type="text" placeholder="Name"/></h1>
                        </div>

                        <div className="big-card-header-stats">
                            <p>Rarity: <input type="text" placeholder="Rarity"/> </p>
                            <p>Category: <input type="text" placeholder="Category"/> </p>
                            <p>Stack: <input type="text" placeholder="Stack"/></p>
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

export { AdminNewItem }