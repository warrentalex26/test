import React from "react";
import './Header.scss'

function Header(props) {
    return (
        <header className={`landing-header`}>
            <div>
                <span className={"HACKER-NEWS"}>
                      HACKER NEWS
                </span>
            </div>
        </header>
    );
}

export default Header;