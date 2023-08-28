import React, {Component} from 'react';
import { useParams } from 'react-router-dom';
import { ItemByName } from '../components/ItemByName';


function Item () {
    const params = useParams()
    const ItemName = params.ItemName
    return(
            <ItemByName ItemName={ItemName}/>
    )
}

export {Item}
