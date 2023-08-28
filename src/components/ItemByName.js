import React, { useEffect } from "react";
import { useState } from "react";
import { Link } from 'react-router-dom';

function ItemByName( {ItemName}){
    const [records, setRecords] = useState([])
    const URL = `http://127.0.0.1:8080/api/item/name/${ItemName}`

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
                        <Link to={"/items"}>↩Back</Link>
                    </div>

                    <div className="big-card-header">

                        <div className="big-card-header-img">
                            <img src={item.img}/>
                            <h1>{item.name}</h1>
                        </div>

                        <div className="big-card-header-stats">
                            <p>Rarity:  {item.rarity}</p>
                            <p>Category: {item.category}</p>
                            <p>Stack: {item.stack}</p>
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

export { ItemByName }