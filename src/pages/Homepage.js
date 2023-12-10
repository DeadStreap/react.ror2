import React from 'react';

import Ror2Poster from '../icons/Risk of Rain 2 poster.jpg'
import Ror2Logo from '../icons/Risk of Rain 2 logo.png'
import gerBoxLogo from '../icons/gearbox_publishing_logo.png'
import hoppooGamesLogo from '../icons/hopoo-games-logo.png'

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

            <div className='home-dlc-buy'>
                <div className='home-dlc-buy-links'>
                    <a href='https://store.steampowered.com/app/1607890/Risk_of_Rain_2_Survivors_of_the_Void/' target='_blank'>Buy for Steam</a>
                    <a href='https://store.epicgames.com/ru/p/risk-of-rain-2--survivors-of-the-void' target='_blank'>Buy for Epic</a>
                    <a href='https://store.playstation.com/en-us/product/UP0292-CUSA16153_00-RISKSURVIVORSOTV' target='_blank'>Buy for PS4</a>
                    <a href='https://www.xbox.com/en-US/games/store/risk-of-rain-2-survivors-of-the-void/9NH7P86MLGX8/0010' target='_blank'>Buy for Xbox</a>
                    <a href='https://www.nintendo.com/us/store/products/survivors-of-the-void-70050000034995-switch/' target='_blank'>Buy for Switch</a>
                </div>
            </div>

            <div className='home-system-requirements'>
                <h1>System requirements: </h1>
                <div className='system-requirements-wrapper'>
                    <div className='system-requirements-min'>
                        <h1>MINIMUM:</h1>
                        <p>Requires a 64-bit processor and operating system</p>
                        <p>OS: Windows 7 or newer, 64-bit</p>
                        <p>Processor: Intel Core i3-6100 / AMD FX-8350</p>
                        <p>Memory: 4 GB RAM</p>
                        <p>Graphics: GTX 580 / AMD HD 7870</p>
                        <p>DirectX: Version 11</p>
                        <p>Network: Broadband Internet connection</p>
                        <p>Storage: 4 GB available space</p>
                    </div>
                    <div className='system-requirements-recommended'>
                        <h1>RECOMMENDED:</h1>
                        <p>Requires a 64-bit processor and operating system</p>
                        <p>OS: Windows 7 or newer, 64-bit</p>
                        <p>Processor: Intel Core i5-4670K / AMD Ryzen 5 1500X</p>
                        <p>Memory: 4 GB RAM</p>
                        <p>Graphics: GTX 680 / AMD HD 7970</p>
                        <p>DirectX: Version 11</p>
                        <p>Network: Broadband Internet connection</p>
                        <p>Storage: 4 GB available space</p>
                    </div>
                </div>
            </div>

            <footer>
                <div className="footer-links">
                    <div className="publishers-links">
                        <a href="https://hopoogames.com/"><img id='hopoo-logo' src={hoppooGamesLogo}/></a>
                        <a href="https://www.gearboxpublishing.com/"><img id='gearbox-logo' src={gerBoxLogo}/></a>
                    </div>
                    <div className="useful-links">
                        <a href="https://www.riskofrain.com/">Official Site</a>
                        <a href="https://store.steampowered.com/app/632360/Risk_of_Rain_2/">Steam Page</a>
                        <a href="https://store.epicgames.com/ru/p/risk-of-rain-2">Epic Games Page</a>
                    </div>
                </div>
                <div className="footer-text">
                    <img src={Ror2Logo}></img> 
                    <p>© 2023</p> 
                </div>
            </footer>

        </div>
    )
}

export { Homepage }
