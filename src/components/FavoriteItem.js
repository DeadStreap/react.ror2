import React, { Component } from 'react';
import { Link } from 'react-router-dom';

function FavoriteItem(item_id) {


    return (
        // <Link to={`/${item.name}`} className='items-card' >
        //     <img src={`/${item.img}`} />
        // </Link>
        <>
        <p>{item_id.item} / </p>
        </>
    )

}

export { FavoriteItem }
