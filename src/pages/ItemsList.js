import React, { useEffect, useState } from "react";
import { Items } from '../components/Items'
import { Link } from 'react-router-dom';
import axios from '../api/axios'

function ItemsList() {
    const [items, addItems] = useState([])
    const [isSearched, setSearched] = useState(false)
    const [allItems, setAllItems] = useState([])
    const [types, setTypes] = useState([])
    const [sortType, setSortType] = useState([])
    const URL = `http://127.0.0.1:8080/api/items`

    useEffect(() => {
        getItems()
    }, [])

    function getItems(){
        fetch(URL)
            .then(response => response.json())
            .then(data => {
                const allitems = data.sort((a, b) => a.rarity.localeCompare(b.rarity));
                addItems(allitems)
                setAllItems(allitems)
            })
            .catch(err => console.log(err))
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

    const ItemLink = ({ item, isSearched }) => (
        <Link key={item.id} to={`/item/${item.name}`} className='items-card' >
            <img src={item.img} />
            {isSearched && <div>{item.name}</div>}
        </Link>
    )

    return (
        <div className='items-wrapper'>
            <div className="items-header">
                <div className="items-header-category">
                    <button className="items-header-btn" onClick={onHeaderClick}>Name</button>
                    <button className="items-header-btn" onClick={onHeaderClick}>Rarity</button>
                    <button className="items-header-btn" onClick={onHeaderClick}>Category</button>
                    <button className="items-header-btn" onClick={onHeaderClick}>Stack</button>
                </div>
                <div className="items-header-search">
                    <input type='text' placeholder="Search" onChange={searchChange} spellcheck='false'/>
                </div>
            </div>
            <div className="items-content">

                {types != false ?
                    (types
                        .map(type => {
                            return (
                                <div key={type} className="filtered-items-container">
                                    <h1>{type}</h1>
                                    <div className="types-items-content">
                                        {items
                                            .filter(item => item[sortType] === type)
                                            .map(filteredItem => (
                                                <ItemLink key={filteredItem.id} item={filteredItem} isSearched={isSearched} />
                                            ))
                                        }
                                    </div>
                                </div>
                            )
                        })) :
                        (items
                            .map(item => {
                                return (
                                    <Link key={item.id} to={`/item/${item.name}`} className='items-card'>
                                        <img src={item.img} />
                                        {isSearched && <div>{item.name}</div>}
                                    </Link>
                                )
                            }))
                }

            </div>
        </div>
    )
}

export { ItemsList }