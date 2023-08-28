import React, { useEffect, useState } from "react";
import {Items} from '../components/Items'
import { Link } from 'react-router-dom';

function ItemsList(){
    const [items, addItems] = useState([])
    const URL = `http://127.0.0.1:8080/api/items`

    useEffect(()=>{
        fetch(URL)
        .then(response => response.json())
        .then(data => addItems(data.sort((a, b) => (a.rarity > b.rarity ? 1 : ((b.rarity > a.rarity)) ? -1 : 0))))
        .catch(err => console.log(err))
    }, [])
    function onHeaderClick(e) {
        let type = e.target.textContent.toLowerCase();
        const sorted = [...items].sort((a, b) => (a[type] > b[type]) ? 1 : ((b[type] > a[type]) ? -1 : 0));
        addItems(sorted)
    }

    const ItemElements = items
    .map((item, index) =>
        <Items key = {index} item={item}/>
    )

    return(
        <div className='items-wrapper'>
            <div className="items-header">
                <button className="items-header-btn" onClick={onHeaderClick}>Name</button>
                <button className="items-header-btn" onClick={onHeaderClick}>Rarity</button>
                <button className="items-header-btn" onClick={onHeaderClick}>Category</button>
                <button className="items-header-btn" onClick={onHeaderClick}>Stack</button>
            </div>
            <div className="items-content">
                {ItemElements}
            </div>
        </div>
    )


//     return(
//         <div className='items-wrapper'>
//             <div className="items-header">
//                 <button className="items-header-btn" onClick={onHeaderClick}>Rarity</button>
//                 <button className="items-header-btn" onClick={raritySort}>Rarity</button>
//                 <button className="items-header-btn" onClick={categorySort}>Category</button>
//                 <button className="items-header-btn" onClick={stackSort}>Stack</button>
//             </div>
//             <div className="items-content">
                
//                 {items && items
//                 .sort((a,b) => a.ratity > b.id ? -1 : 1)
//                 .map(item =>{
//                     return(
//                         <Link to={`/item/${item.name}`} className='items-card' >
//                             <img src={item.img}/>
//                         </Link>
//                     )
//                 })
//                 }

//             </div>
//         </div>
//     )
// }

}

export { ItemsList }