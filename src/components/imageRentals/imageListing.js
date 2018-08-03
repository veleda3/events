import React, { Component } from 'react'
import {connect} from 'react-redux';
import {imageData} from '../../data/images'
import * as actions from '../../redux/actions/imagesActions'
import CategoryListing from './categoryListing'



class ImageListing extends Component {


    componentDidMount() {
        this.props.getCategories()
    }

    saveDescription(e) {
        const {categories} = this.props
            categories.filter(category => category.category == e.category).map( category => {
                const imageInCategory = category.images.find( image => image === e)
                imageInCategory.description = e.description
                const newCategory = {category: e.category, images: imageInCategory}
                const unchangedCategories = categories.filter(singleCategory => singleCategory.category !== newCategory.category)
                debugger
                this.setState({categories: [...unchangedCategories, newCategory]})
            }
        )
    }



    removeImage(e) {
        const {categories} = this.props
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
        return this.props.categories.map((images, index) => {
            return (
                <div key={`image-${index}`}>
                    <CategoryListing
                        key={`images-item${index}`}
                        category={images.category}
                        images={images.images}
                        categoryInfo={images}
                        profileImage={images.category === 'Profile' ? true:false}
                        removeImage={this.removeImage}
                        saveDescription={this.saveDescription}
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

const mapStateToProps = ({categories}) => {
    return {categories}
}

export default connect(mapStateToProps, actions)(ImageListing)