import React from 'react'

export const Header = (props) => {
    const {Link} = props
    return(
        <div className="header" style={{ height: props.height, borderBottomWidth: props.borderBottomWidth }}>
        <div className="name">Company</div>
        <div className="description">Edit your photos</div>
        <div className="links">
            <Link to ="/Profile" className="navbar-brand">Profile</Link>
            <Link to ="/Home Rentals">Home Rentals</Link>
            <Link to ="/Planning">Planning</Link>
        </div>
        </div>
    )
}
