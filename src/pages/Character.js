import React, {Component} from 'react';
import { useParams } from 'react-router-dom';
import { CharacterByName } from '../components/CharacterByName';


function Character () {
    const params = useParams()
    const CharacterName = params.CharacterName
    return(
            <CharacterByName CharacterName={CharacterName}/>
    )
}

export {Character}
