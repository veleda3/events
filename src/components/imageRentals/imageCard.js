import React from 'react';
import {getItemStyle} from '../../share/dragDropHelpers'



class Card extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            editing: false, 
            description: this.props.description,
            categoryChange: false,
            id: this.props.imageId,
            categories: [ 
                {Category: 'Profile', id: '5b69037e7b00a709276a3077'}, {Category: 'Home Rentals', id: '5b6904ae7b00a709276a3079'}, {Category:'Planning', id: '5b6904b77b00a709276a307a'}
            ] 
        }
        this.saveDescription = this.saveDescription.bind(this)
    }

    edit() {
        this.setState({editing: true, cache: this.state.description});
    }
    
    saveDescription(e) {
        e.preventDefault();
        this.setState({editing: false, description: this.state.cache, cache: undefined})
        const {id, description} = this.state
        this.props.updateImage({
            variables: {
                id: id,
                description: this.state.cache
            }
        })

    }

    cancel(e) {
        e.preventDefault();
        this.setState({editing: false, cache: undefined});
    }

    handleChange(e) { 
        this.setState({cache: e.target.value})
      }

    renderDisplay() {
        const {changeCategory} = this.props
        return (
            <div>
                <div>
                    <p><span className='badge badge-secondary'>Description:</span> {this.state.description}</p>
                </div>
                <div style={{margin: 3, justifyContent: 'center', alignItems: 'center', display: 'flex'}}>
                    <button style={{paddingLeft: 64, paddingRight: 64}}className='btn btn-primary' onClick={this.edit.bind(this)}>Edit</button>
                </div>
            </div>
        )
    }

    changeCategory() {
        this.setState({categoryChange: !this.state.categoryChange})
        console.log(this.state.categoryChange)
    }

    renderCategories() {
        const {imageInfo, changeCategories} = this.props
        return (
            <div>
                <ul class="list-group">
                {this.state.categories.map(category => 
                        <button onClick={() => changeCategories({imageInfo: imageInfo, category: category})} class="list-group-item">{category.Category}</button>
                )}
                    <button onClick={this.changeCategory.bind(this)}class="btn btn-danger">cancel</button>
                </ul>
            </div>
        )
    }

    renderNoCategoryChange() { 
        return (
            <div style={{margin: 3, justifyContent: 'center', alignItems: 'center', display: 'flex'}}>
                <button className='btn btn-success' onClick={this.changeCategory.bind(this)}>Change Category</button>
            </div>
        )
    }
    
    renderForm() {
        const {mageInfo} = this.props
        const {description} = this.state
        return (
            <div>
                <form className='form-group'>
                <textarea className='form-control' name="" id="" cols="30" rows="3" value={this.state.cache} onChange={this.handleChange.bind(this)}></textarea>
                <button className='btn btn-success' onClick={this.saveDescription}>Save</button>
                <button className='btn btn-danger'onClick={this.cancel.bind(this)}>Cancel</button>
                    
                </form>
            </div>
        )
    }
    
    render() {

        const {
            image,   
            isDragging,
            removeImage,
            imageInfo,
            provided,
            snapshot
        } = this.props
        const opacity = isDragging ? 0 : 1;
        return (
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
                <div className='thumb1'>
                    <img className='card-img-top' src={image} alt=''></img>
                </div>
                <div style={{opacity}}>


                        <div className='card-block'>
                            <div className='card-text'>{this.state.editing ? this.renderForm() : this.renderDisplay()}
                            </div>
                        </div>
                        <div style={{margin: 3, justifyContent: 'center', alignItems: 'center', display: 'flex'}}>
                            <button style={{paddingLeft: 41, paddingRight: 41}} className='btn btn-danger' onClick={() => removeImage(imageInfo)}>delete me</button>
                        </div>
                        {this.state.categoryChange ? this.renderCategories() : this.renderNoCategoryChange()}
                </div>
                </div>
                )
    }    
}


export default Card