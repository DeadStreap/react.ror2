import React, { useState } from "react";

import SunIcon from '../icons/sun.png'
import MoonIcon from '../icons/moon.png'

const ThemeControl = () =>{
    const [themeIcon, setThemeIcon] = useState(SunIcon)

        const setDarkTheme = () =>{
            document.querySelector('body').setAttribute('data-theme', 'dark')
            setThemeIcon(SunIcon)
        }
        const setLightTheme = () =>{
            document.querySelector('body').setAttribute('data-theme', 'light')
            setThemeIcon(MoonIcon)
        }
        const toogleTheme = e =>{
            if(e.target.checked) setLightTheme()
            else setDarkTheme()
        }

    return(
        <div className="theme-control">
            <input type='checkbox' id='theme-input' onChange={toogleTheme} style={{display: 'none'}}/>
            <label for='theme-input'> <img src={themeIcon}/> </label>
        </div>
    )
}

export { ThemeControl }