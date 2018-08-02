import React from 'react'
import {ImageCard} from './imageCard'


export default class CategoryListing extends React.Component {


    renderImages() {
        const {profileImage} = this.props
        return this.props.images.map((image, index) => {
            return  <ImageCard 
                        key={`image-${index}`}  
                        image={image.image}
                        description={image.description}
                        Ranking={image.Ranking}
                        createdAt={image.createdAt}
                        profileImage={profileImage}
                    />
            })
    }



    render() {
        const {category} = this.props
        return (   
            <section id='rentalListing'>
                <h2>{category}</h2>
                <div className='row' style={{overflowX : 'auto',fontSize: '14px'}}>
                {this.renderImages()}
                </div>
            </section>  
        )
    }
}

