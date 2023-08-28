import { Routes, Route, Link } from 'react-router-dom';
import React, { useState, useEffect } from "react";
import Cookies from 'js-cookie';

import { Homepage } from './pages/Homepage';
import { ArtifactsList } from './pages/ArtifactsList';
import { Artifact } from './pages/Artifact';
import { CharactersList } from './pages/CharactersList';
import { Notfoundpage } from './pages/Notfoundpage';
import { ItemsList } from './pages/ItemsList';
import { Item } from './pages/item';
import { EquipmentList } from './pages/EquipmentList';
import { Equipment } from './pages/Equipment';
import { Character } from './pages/Character';
import { Register } from './pages/Register';
import { Auth } from './pages/Auth';
import { Profile } from './pages/Profile';

function App() {
  const [login, setLogin] = useState('');
  const [email, setEmail] = useState('');
  const [user_img, setUserImg] = useState('');

  if(JSON.parse(localStorage.getItem('userInf'))){
    var UserInf = JSON.parse(localStorage.getItem('userInf'))
  }

  const handleGetUser = (get) =>{
    var UserInf = JSON.parse(localStorage.getItem('userInf'))
    if(UserInf){
    setLogin(UserInf.login)
    setEmail(UserInf.email)
    setUserImg(UserInf.user_img)
    }else{
    setLogin(get.login)
    setEmail(get.email)
    setUserImg(get.user_img)
    }
  }
  useEffect(()=>{
    if(UserInf){
      setLogin(UserInf.login)
      setEmail(UserInf.email)
      setUserImg(UserInf.user_img)
    }
}, [])

  return (
    <>
      <header>
        <div className='header-void'>
        </div>
        <div className='header-nav'>
          <Link to="/">Home</Link>
          <Link to="/artifacts">Artifacts</Link>
          <Link to="/characters">Characters</Link>
          <Link to="/items">Items</Link>
          <Link to="/equipments">Equipment</Link>
        </div>
        <div className='header-user'>
          {login || UserInf ? (
            <Link to="/profile">{UserInf.login}</Link>
          ) : (
          <Link to="/authorization">Sign-in</Link>)}
        </div>
      </header>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/artifacts" element={<ArtifactsList />} />
        <Route path="/artifact" element={<Artifact />} />
        <Route path="/characters" element={<CharactersList />} />
        <Route path="/items" element={<ItemsList />} />
        <Route path="/item/:ItemName" element={<Item />} />
        <Route path="/equipments" element={<EquipmentList />} />
        <Route path="/equipment/:EquipmentName" element={<Equipment />} />
        <Route path="/character/:CharacterName" element={<Character />} />
        <Route path="/register" element={<Register />} />
        <Route path="/authorization" element={<Auth getUser={handleGetUser}/>} />
        <Route path="/profile" element={<Profile getUser={handleGetUser}/>} />
        <Route path="*" element={<Notfoundpage />} />
      </Routes>
    </>
  );
}

export default App;
