import React, { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import axios from '../api/axios'

function ItemsList() {
    const [items, addItems] = useState([])
    const [isSearched, setSearched] = useState(false)
    const [allItems, setAllItems] = useState([])
    const [types, setTypes] = useState([])
    const [sortType, setSortType] = useState([])
    const URL = `https://node-ror2.vercel.app/api/items`

    useEffect(() => {
        getItems()
    }, [])

    async function getItems() {
        try {
            const response = await fetch(URL);
            const data = await response.json();
            const allitems = data.sort((a, b) => a.rarity.localeCompare(b.rarity));
            addItems(allitems);
            setAllItems(allitems);
        } catch (err) {
            console.log(err);
        }
    }

    function onHeaderClick(e) {
        const type = e.target.textContent.toLowerCase();
        setSortType(type);
        const sortedItems = [...items].sort((a, b) => (a[type] > b[type]) ? 1 : ((b[type] > a[type]) ? -1 : 0));
        addItems(sortedItems);
        if (type === 'rarity' || type === 'stack') {
            const typesArr = items.map(item => item[type]);
            setTypes([...new Set(typesArr)]);
        } else {
            setTypes(false);
        }
    }

    function searchChange(e){
        const query = e.target.value.toLowerCase();
        if(query !== ''){
            setSearched(true);
            const searchedItems = allItems.filter(item => item.name.toLowerCase().includes(query));
            addItems(searchedItems);
            if(types !== false){
                setTypes(false);
            }
        } else {
            setSearched(false);
            addItems(allItems);
        }
    }

return (
    <div className='items-wrapper'>
        <div className="items-header">
            <div className="items-header-category">
                <button className="items-header-btn" onClick={onHeaderClick} translate="no">Name</button>
                <button className="items-header-btn" onClick={onHeaderClick} translate="no">Rarity</button>
                <button className="items-header-btn" onClick={onHeaderClick} translate="no">Category</button>
                <button className="items-header-btn" onClick={onHeaderClick} translate="no">Stack</button>
            </div>
            <div className="items-header-search">
                <input type='text' placeholder="Search" onChange={searchChange} spellCheck='false'/>
            </div>
        </div>
        <div className="items-content">
            {types != false ? (
                types.map(type => (
                    <div key={type} className="filtered-items-container">
                        <h1>{type}</h1>
                        <div className="types-items-content">
                            {items
                                .filter(item => item[sortType] === type)
                                .map(filteredItem => (
                                    <Link key={filteredItem.id} to={`/item/${filteredItem.name}`} className='items-card'>
                                        <img src={filteredItem.img} />
                                        {isSearched && <div>{filteredItem.name}</div>}
                                    </Link>
                                ))}
                        </div>
                    </div>
                ))
            ) : (
                items.map(item => (
                    <Link key={item.id} to={`/item/${item.name}`} className='items-card'>
                        <img src={item.img} />
                        {isSearched && <div>{item.name}</div>}
                    </Link>
                ))
            )}
        </div>
    </div>
);
}


export { ItemsList }