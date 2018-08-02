import React from 'react';

export function ImageCard(props) {
    const {image, description, createdAt, Ranking, profileImage} = props

    return (
        <div className={profileImage ? 'col-md-12 col-xs-6': 'col-md-4 col-xs-6'}>
            <div className='card bwm-card'>
                <img className='card-img-top' src={image} alt=''></img>
                <div className='card-block'>
                    <h6 className='card-subtitle'> image Ranking: {Ranking}</h6>
                    <p className='card-text'>{description}</p>
                    <a href='' className='card-link'>last changed at:{createdAt}</a>
                </div>
            </div>
        </div>
    )
}
