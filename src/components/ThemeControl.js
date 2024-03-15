import React, { useState, useEffect } from "react";

import SunIcon from '../icons/sun.png';
import MoonIcon from '../icons/moon.png';

const ThemeControl = () =>{
    const [themeIcon, setThemeIcon] = useState(SunIcon);

    useEffect(() => {
        const savedTheme = localStorage.getItem('selectedTheme');
        (savedTheme === 'light' ? setLightTheme() : setDarkTheme());
    }, []);

    const setTheme = (theme, icon) => {
        document.querySelector('body').setAttribute('data-theme', theme);
        setThemeIcon(icon);
        localStorage.setItem('selectedTheme', theme);
    };

    const setDarkTheme = () => {
        setTheme('dark', SunIcon);
    };

    const setLightTheme = () => {
        setTheme('light', MoonIcon);
    };

    const toogleTheme = e =>{
        if(e.target.checked) setLightTheme();
        else setDarkTheme();
    };

    return(
        <div className="theme-control">
            <input type='checkbox' id='theme-input' onChange={toogleTheme} style={{display: 'none'}}/>
            <label htmlFor='theme-input'> <img src={themeIcon} alt='Theme Icon'/> </label>
        </div>
    );
};

export { ThemeControl };