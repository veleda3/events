import React from 'react'
import Card from './imageCard'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';


const grid = 8;

const getListStyle = isDraggingOver => ({
    background: isDraggingOver ? 'lightblue' : 'lightgrey',
    display: 'flex',
    padding: grid,
    overflow: 'auto',
});

const getItemStyle = (isDragging, draggableStyle) => ({
    // some basic styles to make the items look a bit nicer
    userSelect: 'none',
    margin: `0 ${grid}px 0 0`,
    marginBottom: 20,
    // change background colour if dragging
    background: isDragging ? 'lightgreen' : 'white',
  
    // styles we need to apply on draggables
    ...draggableStyle,
  });

  const reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list.images);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);
    return result;
  };

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
        const {imageInfo, category} = e
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
        const {profileImage, saveDescription, handleDescriptionChange, updateImage, changeCategory, categories } = this.props
        const {images} = this.state
        return (
            
            <DragDropContext onDragEnd={this.onDragEnd}>
                <Droppable droppableId="droppable" direction="horizontal">
                    {(provided, snapshot) => (
                    <div className="container">
                    <div
                        ref={provided.innerRef}   
                        className={'row justify-content-center'}
                        style={{marginBottom: 50}}
                    >
                    
                        {images.map((image, index) => (
                            <Draggable key={image.id} draggableId={image.id} index={index}>
                                {(provided, snapshot) => (
                                    <div 
                                        className='card bwm-card'
                                        ref={provided.innerRef}
                                            {...provided.draggableProps}
                                            {...provided.dragHandleProps}
                                            style={getItemStyle(
                                                snapshot.isDragging,
                                                provided.draggableProps.style
                                            )}
                                    >
                                    <img className='card-img-top' src={image} alt=''></img>
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
                                        />
                                    </div>
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