import React, {useEffect, useState} from "react";

import './Navigation.scss'

function Navigation({_selectedTab = 'all', onChangeTab = () => {}}) {

    const [selectedTab, setSelectedTab] = useState('all');

    useEffect(() => {
        return () => {
            setSelectedTab(_selectedTab);
        };
    }, [_selectedTab]);


    return (
        <nav className={`landing-tab-selector text-center`}>
            <ul>
                <li className={`${selectedTab === 'all' ? 'active' : ''}`} onClick={()=>{setSelectedTab('all'); onChangeTab('all');}} key={`opt-all`}>
                    <a href="#">
                        All
                    </a>
                </li>
                <li className={`${selectedTab === 'faves' ? 'active' : ''}`} onClick={()=>{setSelectedTab('faves'); onChangeTab('faves');}} key={`opt-faves`}>
                    <a href="#">My faves</a>
                </li>
            </ul>
        </nav>
    );
}

export default Navigation;