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
                const allitems = (data.sort((a, b) => (a.rarity > b.rarity ? 1 : ((b.rarity > a.rarity)) ? -1 : 0)))
                addItems(allitems)
                setAllItems(allitems)
            })
            .catch(err => console.log(err))
    }

    function onHeaderClick(e) {
        let type = e.target.textContent.toLowerCase();
        setSortType(type)
        const sorted = [...items].sort((a, b) => (a[type] > b[type]) ? 1 : ((b[type] > a[type]) ? -1 : 0));
        addItems(sorted)

        if (type == 'rarity' || type == 'stack') {
            let typesarr = []
            items.map((item) => {
                typesarr.push(item[type])
            })
            setTypes([...new Set(typesarr)])
        } else {
            setTypes(false)
        }
    }

    function searchChange(e){
        let query = e.target.value.toLowerCase();
        if(query != ''){
            setSearched(true)
            const searchedItems = []
            allItems.map((item) =>{
                if(item.name.toLowerCase().indexOf(query) != -1){
                    searchedItems.push(item)
                }
            })
            addItems(searchedItems)
        }else{
            setSearched(false)
            addItems(allItems)
        }
    }


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
                    <input type='text' placeholder="Search" onChange={searchChange}/>
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
                                            .map(item => {
                                                if (item[sortType] == type) {
                                                    return (
                                                        <Link key={item.id} to={`/item/${item.name}`} className='items-card' >
                                                            <img src={item.img} />
                                                            {isSearched == true ? (<div>{item.name}</div>) : (<></>)}
                                                        </Link>
                                                    )
                                                }
                                            })}
                                    </div>
                                </div>
                            )
                        })) :
                    (items
                        .map(item => {
                            return (
                                <Link key={item.id} to={`/item/${item.name}`} className='items-card' >
                                    <img src={item.img} />
                                    {isSearched == true ? (<div>{item.name}</div>) : (<></>)}
                                </Link>
                            )
                        }))
                }

                {/* {items
                .map(item =>{
                    return(
                        <Link to={`/item/${item.name}`} className='items-card' >
                            <img src={item.img}/>
                        </Link>
                    )
                })
                } */}

            </div>
        </div>
    )
}

export { ItemsList }