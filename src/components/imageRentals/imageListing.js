import React, { Component } from 'react'
import {graphql, compose} from 'react-apollo'
import CategoryListing from './categoryListing'
import {Loading} from '../../share/loading'
import {getCategoriesQuery, deleteImageQuery, updateImage, addImage} from '../../queries'

class ImageListing extends Component {

    constructor(props){
        super(props)
        this.state = {
            categories: []
        }
        this.displayCategories = this.displayCategories.bind(this)
        this.updateCategories = this.updateCategories.bind(this)
    }

    componentDidUpdate(prevProps) {
        if(prevProps.getCategoriesQuery.loading !== this.props.getCategoriesQuery.loading && this.props.getCategoriesQuery.loading === false) {
            this.setState({ 
                categories: this.props.getCategoriesQuery.categories
            }, () => {console.log(this.state.categories)})
            
        }
    }

    updateCategories(e){
        const {imageInfo, category} = e
        const {categories} = this.state
        const {addImage} = this.props
        let categoryToUpdate = JSON.parse(JSON.stringify(categories.find(single => category.Category === single.name)))
        let updatedImages = [...categoryToUpdate.images, imageInfo]
        categoryToUpdate.images = updatedImages
        const unchangedCategories = categories.filter(single => category.Category !== single.name)
        let updatedCategories = [...unchangedCategories, categoryToUpdate]
        this.setState({categories: updatedCategories})

        addImage({
            variables: {
                image: imageInfo.image,
                description: imageInfo.description,
                ranking: imageInfo.ranking,
                categoryId: category.id

            }
        }) 

    }

    displayCategories(){
        const {
            deleteImageQuery, 
            addImage,
            updateImage, 
            Route,
        } = this.props

        const {categories} = this.state
            return categories.map((category, index) => {
                return <Route key={`route-item${index}`} path={`/${category.name}`} render={() => 
                    <CategoryListing 
                        key={`images-item${index}`}
                        category={category.name}
                        images={category.images}
                        categoryInfo={category}
                        profileImage={category.category === 'Profile' ? true:false}
                        handleDescriptionChange={this.handleDescriptionChange}
                        deleteImage={deleteImageQuery}
                        updateImage={updateImage}
                        updateCategories={this.updateCategories}
                        addImage={addImage}

                    />}

                />
            })
        

    
    }

    render () {
        const {getCategoriesQuery,} = this.props
        return (
            <section id='rentalListing'>
                <div className="content">
                    <div className='row'>
                    {getCategoriesQuery.loading ? <Loading />: this.displayCategories()}
                    </div>
                </div>
            </section>  
        )
    }
}


export default compose(
    graphql(getCategoriesQuery, {name: "getCategoriesQuery"}),
    graphql(deleteImageQuery, { name: "deleteImageQuery"}),
    graphql(updateImage, {name: "updateImage"}),
    graphql(addImage, {name: "addImage"})
)(ImageListing)