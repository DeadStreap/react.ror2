import React, {useState} from "react";
import axios from '../api/axios'

const AvaratPopup = ({active, setActive, setUserImg}) =>{

var userId = JSON.parse(localStorage.getItem('userInf')).user_id
var email = JSON.parse(localStorage.getItem('userInf')).email
var login = JSON.parse(localStorage.getItem('userInf')).login


  const updateAvatar = async (avatarURL) => {
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

async function changeHandler(e){
  const uploadURL = 'http://localhost:8080/api/user/upload/avatar'
  const file = e.target.files[0]
  const formData = new FormData()
  formData.append("file", file)
  const response = await axios.post(uploadURL, formData,{
    headers:{ "Content-Type": "multipart/form-data"},
  }).then(function (response) {
    console.log(response.data);
    updateAvatar(response.data)
  })
}

    return(
        <div className={active ? "avatar-popup-wrapper avatar-popup-wrapper-active" : "avatar-popup-wrapper"} onClick={()=> setActive(false)}>
            <div className="avatar-popup" onClick={e => e.stopPropagation()}>
                <form>
                    <label for='upload_avatar'>Upload avatar</label>
                    <input id="upload_avatar" accept="/image/*" onChange={e => changeHandler(e)} type="file" placeholder="Upload avatar" />
                </form>
                <button onClick={()=> setActive(false)}>Go back</button>
            </div>
        </div>
    )
}

export default AvaratPopup