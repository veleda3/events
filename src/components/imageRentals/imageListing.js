import React, { Component } from 'react'
import {ImageCard} from './imageCard'
import {imageData} from '../../data/images'
import CategoryListing from './categoryListing'


export default class ImageListing extends Component {
    constructor(props) {
        super(props)
        this.state = {
            categories: imageData
        } 
        this.removeImage = this.removeImage.bind(this)
    }

    removeImage(e) {
        const {categories} = this.state
        categories.filter(category => category.category == e.category).map( category => {    
                const noImageInCategory = category.images.filter( image => image !== e )
                const newCategory = {category: e.category, images: noImageInCategory}
                const unchangedCategories = categories.filter(singleCategory => 
                singleCategory.category !== newCategory.category)
                this.setState(
                    {categories: [...unchangedCategories, newCategory]}
                )
            }
        )       
    }

    renderCategories(){
        return this.state.categories.map((images, index) => {
            return (
                <div key={`image-${index}`}>
                    <CategoryListing
                        key={`images-item${index}`}
                        category={images.category}
                        images={images.images}
                        profileImage={images.category === 'Profile' ? true:false}
                        removeImage={this.removeImage}
                    />
                </div>
            )
        })
    }




    render () {
        return (
            <section id='rentalListing'>
                <h1 className='page-title'>Edit your photos</h1>
                <div className='row' style={{overflowX : 'auto',fontSize: '14px'}}>
                {this.renderCategories()}
                </div>
            </section>  
        )
    }
}