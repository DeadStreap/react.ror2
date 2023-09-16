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
        </div>
    )
}

export { Homepage }
