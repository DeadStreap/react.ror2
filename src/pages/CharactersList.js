import React, { useEffect } from "react";
import { useState } from "react";
import { Characters } from '../components/Characters';

function CharactersList(){
    const [characters, setCharacters] = useState([])
    const URL = `https://node-ror2.vercel.app/api/characters`

    useEffect(()=>{
        fetch(URL)
        .then(response => response.json())
        .then(data => setCharacters(data))
        .catch(err => console.log(err))
    }, [])

    const CharacterElement = characters.map((item, index) =>
        <Characters key = {index} item={item}/>
    )

    return(
        <div className='items-wrapper'>
            <div className="items-content">
                {CharacterElement}
            </div>
        </div>
    )
}

export { CharactersList }
