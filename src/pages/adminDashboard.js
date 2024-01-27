import React, { useEffect } from "react";
import { Link } from 'react-router-dom';


function AdminDashboard () {

    useEffect(() => {
        checkAdmin()
    }, [])

    function checkAdmin(){
        if(JSON.parse(localStorage.getItem('userInf')).isAdmin == 0){
            window.location.href = "/";
        }
    }

    return(
        <>
        <div className='admin-dashboard-wrapper'>

            <div className='admin-dashboard-menu'>
            <Link to="/admindashboard/characters">Characters</Link>
            <Link to="/admindashboard/items">Items</Link>
            <Link to="/admindashboard/equipments">Equipment</Link>
            <Link to="/admindashboard/users">Users</Link>
            </div>

        <div className="content-wrapper">

        </div>

        </div>
        </>
    )
}

export {AdminDashboard}
