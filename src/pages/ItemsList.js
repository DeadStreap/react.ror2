import React, { useEffect, useState } from "react";
import { Items } from '../components/Items'
import { Link } from 'react-router-dom';


function ItemsList() {
    const [items, addItems] = useState([])
    const [types, setTypes] = useState([])
    const [sortType, setSortType] = useState([])
    const URL = `http://127.0.0.1:8080/api/items`

    useEffect(() => {
        fetch(URL)
            .then(response => response.json())
            .then(data => addItems(data.sort((a, b) => (a.rarity > b.rarity ? 1 : ((b.rarity > a.rarity)) ? -1 : 0))))
            .catch(err => console.log(err))
    }, [])

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


    return (
        <div className='items-wrapper'>
            <div className="items-header">
                <button className="items-header-btn" onClick={onHeaderClick}>Name</button>
                <button className="items-header-btn" onClick={onHeaderClick}>Rarity</button>
                <button className="items-header-btn" onClick={onHeaderClick}>Category</button>
                <button className="items-header-btn" onClick={onHeaderClick}>Stack</button>
            </div>
            <div className="items-content">

                {types != false ?
                    (types
                        .map(type => {
                            return (
                                <div key={type} className="filtered-items-container">
                                    <h1>{type}</h1>
                                    <div className="items-content">
                                        {items
                                            .map(item => {
                                                if (item[sortType] == type) {
                                                    return (
                                                        <Link key={item.id} to={`/item/${item.name}`} className='items-card' >
                                                            <img src={item.img} />
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