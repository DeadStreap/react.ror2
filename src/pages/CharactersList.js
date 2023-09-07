import React, { useEffect } from "react";
import { useState } from "react";
import { Characters } from '../components/Characters';

function CharactersList(){
    const [characters, setCharacters] = useState([])
    const URL = `http://127.0.0.1:8080/api/characters`

    useEffect(()=>{
        fetch(URL)
        .then(response => response.json())
        .then(data => setCharacters(data))
        .catch(err => console.log(err))
    }, [])

    const CharacterElemetnt = characters.map((item, index) =>
        <Characters key = {index} item={item}/>
    )

    return(
        <div className='items-wrapper'>
            <div className="items-content">
                {CharacterElemetnt}
            </div>
        </div>
    )
}

export { CharactersList }
