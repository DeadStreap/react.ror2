import React, { useEffect } from "react";
import { useState } from "react";
import { Link } from 'react-router-dom';

function EquipmentList() {
    const [equipments, setEquipments] = useState([])
    const [allEquipments, setAllEquipments] = useState([])
    const [isSearched, setSearched] = useState(false)
    const URL = `https://node-ror2.vercel.app/api/equipments`

    useEffect(() => {
        fetch(URL)
            .then(response => response.json())
            .then(data => {
                const AllEquipments = data.sort((a, b) => a.name.localeCompare(b.name));
                setEquipments(AllEquipments)
                setAllEquipments(AllEquipments)
            })
            .catch(err => console.log(err))
    }, [])

    function searchChange(e) {
        const query = e.target.value.toLowerCase();
        if (query !== '') {
            setSearched(true);
            const searchedItems = allEquipments.filter(item => item.name.toLowerCase().includes(query));
            setEquipments(searchedItems);
        } else {
            setSearched(false);
            setEquipments(allEquipments);
        }
    }

    return (
        <div className='items-wrapper'>
            <div className="items-header">
                <div className="items-header-search">
                    <input type='text' placeholder="Search" onChange={searchChange} spellcheck='false' />
                </div>
            </div>
            <div className="items-content">
                {equipments.map(item => {
                    return (
                        <Link key={item.id} to={`/equipment/${item.name}`} className='equipments-card'>
                            <img src={item.img} />
                            {isSearched && <div>{item.name}</div>}
                        </Link>
                    )
                })}
            </div>
        </div>
    )
}

export { EquipmentList }
