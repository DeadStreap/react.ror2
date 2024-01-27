import { Routes, Route, Link } from 'react-router-dom';
import React, { useState, useEffect } from "react";

import { Homepage } from './pages/Homepage';
import { Notfoundpage } from './pages/Notfoundpage';

import { CharactersList } from './pages/CharactersList';
import { Character } from './pages/Character';
import { ItemsList } from './pages/ItemsList';
import { Item } from './pages/item';
import { EquipmentList } from './pages/EquipmentList';
import { Equipment } from './pages/Equipment';

import { Register } from './pages/Register';
import { Auth } from './pages/Auth';
import { Profile } from './pages/Profile';
import {ThemeControl} from './components/ThemeControl'

import { AdminItems} from './pages/adminItems'
import { AdminCharacters} from './pages/adminCharacters'
import { AdminEquipments} from './pages/adminEquipments'
import { AdminUsers} from './pages/adminUsers'
import { AdminDashboard} from './pages/adminDashboard'

function App() {
  const [login, setLogin] = useState('');
  const [email, setEmail] = useState('');
  const [user_img, setUserImg] = useState('');
  const [user_id, setUserId] = useState('');
  const [isAdmin, setIsAdmin] = useState('');

  if(JSON.parse(localStorage.getItem('userInf'))){
    var UserInf = JSON.parse(localStorage.getItem('userInf'))
  }

  const handleGetUser = (get) =>{
    var UserInf = JSON.parse(localStorage.getItem('userInf'))
    if(UserInf){
    setLogin(UserInf.login)
    setEmail(UserInf.email)
    setUserImg(UserInf.user_img)
    setUserId(UserInf.user_id)
    setIsAdmin(UserInf.isAdmin)
    }else{
    setLogin(get.login)
    setEmail(get.email)
    setUserImg(get.user_img)
    setUserId(get.user_id)
    setIsAdmin(get.isAdmin)
    }
  }
  useEffect(()=>{
    if(UserInf){
      setLogin(UserInf.login)
      setEmail(UserInf.email)
      setUserImg(UserInf.user_img)
      setUserId(UserInf.user_id)
      setIsAdmin(UserInf.isAdmin)
    }
}, [])

  return (
    <>
      <header>
        <div className='header-void'>
        </div>
        <div className='header-nav'>
          <Link to="/">Home</Link>
          <Link to="/characters">Characters</Link>
          <Link to="/items">Items</Link>
          <Link to="/equipments">Equipment</Link>
        </div>
        <div className='header-user'>
          <ThemeControl />
          {login || UserInf ? (
            <Link to="/profile">{UserInf.login}</Link>
          ) : (
          <Link to="/authorization">Sign-in</Link>)}
        </div>
      </header>
      
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/characters" element={<CharactersList />} />
        <Route path="/character/:CharacterName" element={<Character />} />
        <Route path="/items" element={<ItemsList />} />
        <Route path="/item/:ItemName" element={<Item />} />
        <Route path="/equipments" element={<EquipmentList />} />
        <Route path="/equipment/:EquipmentName" element={<Equipment />} />

        <Route path="/register" element={<Register />} />
        <Route path="/authorization" element={<Auth getUser={handleGetUser}/>} />
        <Route path="/profile" element={<Profile getUser={handleGetUser}/>} />

        <Route path="/admindashboard" element={<AdminDashboard />} />
        <Route path="/admindashboard/characters" element={<AdminCharacters />} />
        <Route path="/admindashboard/items" element={<AdminItems />} />
        <Route path="/admindashboard/equipments" element={<AdminEquipments />} />
        <Route path="/admindashboard/users" element={<AdminUsers />} />

        <Route path="*" element={<Notfoundpage />} />
      </Routes>
    </>
  );
}

export default App;
