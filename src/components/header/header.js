import React from 'react'


export const Header = (props) => {
    const {Link} = props
    return (
        <div>
            <ul>
                <li>
                    <Link to="/Profile">Profile</Link>
                </li>
                <li>
                    <Link to="/Home Rentals">Home Rentals</Link>
                </li>
                <li>
                    <Link to="/Planning">Planning</Link>
                </li>
            </ul>
        </div>
    )
}