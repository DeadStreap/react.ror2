import React from 'react';

import Ror2Poster from '../icons/Risk of Rain 2 poster.jpg'
import Ror2Logo from '../icons/Risk of Rain 2 logo.png'

const Homepage = () => {
    return (
        <div className='home-wrapper'>

            <div className='home-main-poster'><img src={Ror2Poster} /></div>

            <div className='home-about-game'>
                <h1>About game:</h1>
                    <p>Risk of Rain 2 is a roguelike third-person shooter developed by Hopoo Games and published by Gearbox Publishing. A sequel to 2013's Risk of Rain, it was released in early access for Microsoft Windows, Nintendo Switch, PlayStation 4 and Xbox One in 2019 before fully releasing in August 2020 with a release for Stadia coming a month later.</p>
                    <p>Players control a survivor who is stranded on an alien planet. To survive, they navigate through various environments, killing monsters and looting chests to collect items that boost their offensive and defensive capabilities. Over time, the game's difficulty increases, spawning more powerful and dangerous creatures. The game supports up to four players in online multiplayer. The game received generally positive reviews upon release.</p>
            </div>

            <div className='home-game-available'>
                <h1>Game available on PC, console and stadia</h1>
                <div className='game-available-links'>
                    <a href='https://store.steampowered.com/app/632360/Risk_of_Rain_2/' target='_blank'>Buy for Steam</a>
                    <a href='https://store.epicgames.com/en-US/p/risk-of-rain-2' target='_blank'>Buy for Epic</a>
                    <a href='https://store.playstation.com/en-us/product/UP0292-CUSA16153_00-RISKOFRAIN2SIEA0' target='_blank'>Buy for PS4</a>
                    <a href='https://www.xbox.com/en-us/games/store/risk-of-rain-2/9p6f6tbggvk3' target='_blank'>Buy for Xbox</a>
                    <a href='https://www.nintendo.com/store/products/risk-of-rain-2-switch/#game-info' target='_blank'>Buy for Switch</a>
                </div>
            </div>

            <div className='home-critics-review'>
                <h1>"Polshed, fun, & Immensely replayable" - IGN</h1>
                <div className='critics-review-rating'>
                    <p> <span> 9.5/10 </span> - PC INVASION</p>
                    <p> <span> 9/10 </span> - SHACKNEWS</p>
                    <p> <span> 9/10 </span> - INDIE GAME WEBSITE</p>
                    <p> <span> 9/10 </span> - IGN</p>
                    <p> <span> 9/10 </span> - GOD IS A GEEK</p>
                </div>
            </div>

        </div>
    )
}

export { Homepage }
