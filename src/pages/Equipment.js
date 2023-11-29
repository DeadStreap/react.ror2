import React from 'react';
import { useParams } from 'react-router-dom';
import { EquipmentByName } from '../components/EquipmentByName';


function Equipment () {
    const params = useParams()
    const EquipmentName = params.EquipmentName
    return(
            <EquipmentByName EquipmentName={EquipmentName}/>
    )
}

export {Equipment}
