import React, { Component } from 'react'
import {gql} from 'apollo-boost'
import {graphql, compose} from 'react-apollo'
import CategoryListing from './categoryListing'
import {getCategoriesQuery, deleteImageQuery} from '../../queries'

class ImageListing extends Component {

    displayImages(){
        const {getCategoriesQuery} = this.props

        if(getCategoriesQuery.loading){
            return (
                <div>Data still loading</div>
            )
        }else {
            return this.renderCategories()
        }
    
    }

    handleDescriptionChange(e) {
        const value = e.target.value;
        this.setState({description: value});
        return value
    }

    renderCategories(){
        const {deleteImageQuery, getCategoriesQuery} = this.props
        return getCategoriesQuery.categories.map((images, index) => {
            return (
                <div key={`image-${index}`}>
                    <CategoryListing
                        key={`images-item${index}`}
                        category={images.name}
                        images={images.images}
                        categoryInfo={images}
                        profileImage={images.category === 'Profile' ? true:false}
                        handleDescriptionChange={this.handleDescriptionChange}
                        deleteImage={deleteImageQuery}
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
                    {this.displayImages()}
                </div>
            </section>  
        )
    }
}


export default compose(
    graphql(getCategoriesQuery, {name: "getCategoriesQuery"}),
    graphql(deleteImageQuery, { name: "deleteImageQuery"})
)(ImageListing)