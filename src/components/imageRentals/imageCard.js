import React from 'react';
import PropTypes from 'prop-types';
import { findDOMNode } from 'react-dom';



class Card extends React.Component {
    render() {

    
        const {
            image, 
            description, 
            createdAt, 
            Ranking, 
            isDragging,
            removeImage,
            imageInfo
        } = this.props
        const opacity = isDragging ? 0 : 1;
        return (
                <div style={{opacity}}>
                    <div className='card bwm-card'>
                        <img className='card-img-top' src={image} alt=''></img>
                        <div className='card-block'>
                            <h6 className='card-subtitle'> image Ranking: {Ranking}</h6>
                            <p className='card-text'>{description}</p>
                            <a href='' className='card-link'>last changed at:{createdAt}</a>
                        </div>
                        <button onClick={() => removeImage(imageInfo)}>delete me</button>
                    </div>
                </div>
                )
    }    
}

const style = {
    border: '1px dashed gray',
    padding: '0.5rem 1rem',
    marginBottom: '.5rem',
    backgroundColor: 'white',
    cursor: 'move',
  };
  
export default Card