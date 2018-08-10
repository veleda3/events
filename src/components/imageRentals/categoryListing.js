import React from 'react'
import Card from './imageCard'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import {reorder} from '../../share/dragDropHelpers'

class CategoryListing extends React.Component {
    constructor(props){
        super(props) 
        this.state = {
            category: this.props.categoryInfo,
            images: this.props.categoryInfo.images 
        }
        this.onDragEnd = this.onDragEnd.bind(this)
        this.removeImage = this.removeImage.bind(this)
        this.changeCategories = this.changeCategories.bind(this)
        
    }

    removeImage(e) {
        const {images} = this.state
            const noImageInCategory = images.filter( image => image !== e )
            this.setState(
                {images: noImageInCategory}
            ) 
                
        this.props.deleteImage({
            variables: {
                id: e.id
            }
        })   
    }

    
    onDragEnd(result) {
        // dropped outside the list
        if (!result.destination) {
            return;
        }
        const items = reorder(
            this.state.category,
            result.source.index,
            result.destination.index
        );

        this.setState({images: items})
    }


    changeCategories(e) {
        const {images} = this.state
        const {imageInfo} = e
        const {deleteImage, updateCategories} = this.props
        const categoryWithoutImage = images.filter(image => image !== imageInfo)
        this.setState(
            {images: categoryWithoutImage}, console.log(this.state.images)
        )
        debugger
        deleteImage({
            variables: {
                id: imageInfo.id
            }
        }) 
        updateCategories(e)      
    }
    
    renderImages() {
        const {profileImage, saveDescription, handleDescriptionChange, updateImage, categories } = this.props
        const {images} = this.state
        return (
            
            <DragDropContext onDragEnd={this.onDragEnd}>
                <Droppable droppableId="droppable" direction="horizontal">
                    {(provided, snapshot) => (
                    <div className="container">
                    <div
                        ref={provided.innerRef}   
                        className={'row justify-content-center'}
                        style={{marginBottom: 50, marginTop: 50}}
                    >
                    
                        {images.map((image, index) => (
                            <Draggable key={image.id} draggableId={image.id} index={index}>
                                {(provided, snapshot) => (
                                        <Card 
                                            key={`image-${index}`}  
                                            image={image.image}
                                            imageId={image.id}
                                            description={image.description}
                                            profileImage={profileImage}
                                            moveCard={this.moveCard}
                                            imageInfo={image}
                                            removeImage={this.removeImage}
                                            saveDescription={saveDescription}
                                            handleDescriptionChange={handleDescriptionChange}
                                            updateImage={updateImage}
                                            categories={categories}
                                            changeCategories={this.changeCategories}
                                            provided={provided}
                                            snapshot={snapshot}
                                        />
                                )}
                            </Draggable>
                        ))}
                        {provided.placeholder}
                    </div>
                    </div>
                    )}
                </Droppable>
            </DragDropContext>
        )    
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



export default CategoryListing