import React, { Component } from 'react'
import {graphql, compose} from 'react-apollo'
import CategoryListing from './categoryListing'
import {getCategoriesQuery, deleteImageQuery, updateImage} from '../../queries'

class ImageListing extends Component {

    displayCategories(){
        const {
            deleteImageQuery, 
            getCategoriesQuery, 
            updateImage, 
            Route
        } = this.props

            return getCategoriesQuery.categories.map((category, index) => {
                return <Route path={`/${category.name}`} render={() => 
                    <CategoryListing 
                        key={`images-item${index}`}
                        category={category.name}
                        images={category.images}
                        categoryInfo={category}
                        profileImage={category.category === 'Profile' ? true:false}
                        handleDescriptionChange={this.handleDescriptionChange}
                        deleteImage={deleteImageQuery}
                        updateImage={updateImage} 

                    />}

                />
            })
        

    
    }

    render () {
        const {Link, Route, getCategoriesQuery,} = this.props
        return (
            <section id='rentalListing'>
            <h1 className='page-title'>Edit your photos</h1>
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
                <div className='row' style={{overflowX : 'auto',fontSize: '14px'}}>
                    {getCategoriesQuery.loading ? <div>Data still loading</div> : this.displayCategories()}

                </div>
            </section>  
        )
    }
}


export default compose(
    graphql(getCategoriesQuery, {name: "getCategoriesQuery"}),
    graphql(deleteImageQuery, { name: "deleteImageQuery"}),
    graphql(updateImage, {name: "updateImage"})
)(ImageListing)