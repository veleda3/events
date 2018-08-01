import React from 'react'

export const Header = () => {
    return (
        <nav className="Header">
            <div className="Header-row">
                <button className="Header-menu">
                <span></span><span></span><span></span><span></span>
                </button>
                <div className="Header-leftSide">
                    <a href="" className="Header-navLink">
                    <span>Venues</span>
                    </a>
                    <a href="" className="Header-navLink">
                    <span>Q&A</span>
                    </a>
                    <a href="" className="Header-navLink">
                    <span>Blog</span>
                    </a>
                </div>
                <a href="" className="Header-logoLink">
                <img src="https://cdn.mayflowervenues.com/img/mayflower-logo.svg" className="Header-logo" alt="Mayflower Logo" />
                </a>
                <div className="Header-rightSide">
                    <a href="" className="Header-navLink" rel="nofollow">
                        <span>Anfitrion</span>
                    </a>
                    <a href="" className="Header-navLink" rel="nofollow">
                        <span>Mi evento</span>
                    </a>
                </div>
            </div>
        </nav>
    )
}
