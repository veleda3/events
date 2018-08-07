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
  
    // change background colour if dragging
    background: isDragging ? 'lightgreen' : 'grey',
  
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
        
    }

    removeImage(e) {
        const {category} = this.state
                const noImageInCategory = category.images.filter( image => image !== e )
                this.setState(
                    {category: {category: category.category, images: noImageInCategory}}
                )     
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
    
    renderImages() {
        const {profileImage, saveDescription, handleDescriptionChange} = this.props
        const {images} = this.state
        debugger
        return (
            <DragDropContext onDragEnd={this.onDragEnd}>
                <Droppable droppableId="droppable" direction="horizontal">
                    {(provided, snapshot) => (
                    <div
                        ref={provided.innerRef}   
                        className={'row'}
                    >
                        {images.map((image, index) => (
                            <Draggable key={image.id} draggableId={image.id} index={index}>
                                {(provided, snapshot) => (
                                    <div 
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
                                            description={image.description}
                                            Ranking={image.Ranking}
                                            createdAt={image.createdAt}
                                            profileImage={profileImage}
                                            moveCard={this.moveCard}
                                            imageInfo={image}
                                            removeImage={this.removeImage}
                                            saveDescription={saveDescription}
                                            handleDescriptionChange={handleDescriptionChange}
                                        />
                                    </div>
                                )}
                            </Draggable>
                        ))}
                        {provided.placeholder}
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