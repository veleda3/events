import React, { Component } from 'react'
import {connect} from 'react-redux';
import {gql} from 'apollo-boost'
import {graphql} from 'react-apollo'
import {imageData} from '../../data/images'
import * as actions from '../../redux/actions/imagesActions'
import CategoryListing from './categoryListing'

const getCategoriesQuery = gql`
    {
        categories {
            name
            images {
                image
                description
                ranking
                categoryId
            }        
        }
    }
`

class ImageListing extends Component {
    constructor(props) {
        super(props)
        this.state = {
            categories: imageData,
        }
        this.removeImage = this.removeImage.bind(this)
    }



    // saveDescription(e) {
    //     const {description} = this.state
    //     const {categories} = this.props
    //         categories.filter(category => category.category == e.category).map( category => {
    //             const imageInCategory = category.images.find( image => image === e)
    //             const noImageInCategory = category.images.filter( image => image !== e )
    //             imageInCategory.description = description
    //             const newCategory = {category: e.category, images: [imageInCategory, ...noImageInCategory]}
    //             const unchangedCategories = categories.filter(singleCategory => singleCategory.category !== newCategory.category)
    //             this.setState({categories: [...unchangedCategories, newCategory]})
    //         }
    //     )
    // }

    handleDescriptionChange(e) {
        const value = e.target.value;
        this.setState({description: value});
        return value
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
        debugger
        return this.state.categories.map((images, index) => {
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
                        handleDescriptionChange={this.handleDescriptionChange}
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

export default graphql(getCategoriesQuery)(ImageListing)