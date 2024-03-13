import React, {useState} from "react";
import axios from '../api/axios'

const AvaratPopup = ({active, setActive, setUserImg}) =>{

var userId = JSON.parse(localStorage.getItem('userInf')).user_id
var email = JSON.parse(localStorage.getItem('userInf')).email
var login = JSON.parse(localStorage.getItem('userInf')).login


  const [avatarURL, setAvatarURL] = useState();

  const handleSubmit = async () => {
    try{
      const UpadateAvatarURL = 'https://node-ror2.vercel.app/api/user/update/avatar'
      const updateInfo = ({url: avatarURL, id: userId})
      setUserImg(avatarURL)
      const response = await axios.post(UpadateAvatarURL, updateInfo);
      let userinf = {
        login: login, 
        email: email,
        user_img: avatarURL,
        user_id: userId
      }
      localStorage.setItem('userInf', JSON.stringify(userinf))
      setActive(false)
    } catch (err){
        console.error('Failed to fetch favorites:', err);
    }
  }

    return(
        <div className={active ? "avatar-popup-wrapper avatar-popup-wrapper-active" : "avatar-popup-wrapper"} onClick={()=> setActive(false)}>
            <div className="avatar-popup" onClick={e => e.stopPropagation()}>
                <form onSubmit={handleSubmit}>
                    <label>Avatar URL: <input type="text" name='url' onChange={(e) => setAvatarURL(e.target.value)} required/> </label>
                    <button>✔</button>
                </form>
                <button onClick={()=> setActive(false)}>Go back</button>
            </div>
        </div>
    )
}

export default AvaratPopup