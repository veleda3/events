import React from 'react';



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
                <p><span className='badge badge-secondary'>Description:</span> {this.state.description}</p>
                <button className='btn btn-primary' onClick={this.edit.bind(this)}>Edit</button>
            </div>
        )
    }

    changeCategories(e) {


        // const {categories, imageInfo} = this.props
        // const oldCategory = imageInfo.category.name
        // const newCategory = e
        // let categoryToDelete = categories.find( category => category.name === oldCategory )
        // const indexOfImage  = categoryToDelete.images.indexOf(imageInfo)
        // let updatedOldImages = categoryToDelete.images.filter(image => image !== imageInfo )
        // categoryToDelete = updatedOldImages
        // debugger
        // const test = categories.filter(category => category.name !== oldCategory)
        // let categoryToAdd = categories.find( category => category === newCategory )
        // categoryToAdd.images.push(imageInfo)
        // categories[newCategory] = categoryToAdd.images

       
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
        return <button className='btn btn-success' onClick={this.changeCategory.bind(this)}>Change Category</button>
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
        } = this.props
        const opacity = isDragging ? 0 : 1;
        return (
                <div style={{opacity}}>
                    <div className='card bwm-card'>
                        <img className='card-img-top' src={image} alt=''></img>
                        <div className='card-block'>
                            <div className='card-text'>{this.state.editing ? this.renderForm() : this.renderDisplay()}
                            </div>
                        </div>
                        <button className='btn btn-danger' onClick={() => removeImage(imageInfo)}>delete me</button>
                        {this.state.categoryChange ? this.renderCategories() : this.renderNoCategoryChange()}
                    </div>
                </div>
                )
    }    
}

const style = {
    border: '1px dashed gray',
    padding: '0.5rem 1rem',
    marginBottom: '.5rem',
    backgroundColor: 'white',
    cursor: 'move',
  };
  
export default Card