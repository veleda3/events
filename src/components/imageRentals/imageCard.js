import React from 'react';



class Card extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            editing: false, 
            description: this.props.description
        }
        this.saveDescription = this.saveDescription.bind(this)
    }

    edit() {
        this.setState({editing: true, cache: this.state.description});
    }
    
    saveDescription(e) {
        e.preventDefault();
        this.setState({editing: false, description: this.state.cache, cache: undefined})
    }

    cancel(e) {
        e.preventDefault();
        this.setState({editing: false, cache: undefined});
    }

    handleChange(e) { 
        this.setState({cache: e.target.value})
      }

    renderDisplay() {
        return (
            <div>
                <p><span className='badge badge-secondary'>Description:</span> {this.state.description}</p>
                <button className='btn btn-primary' onClick={this.edit.bind(this)}>Edit</button>
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
            imageInfo
        } = this.props
        const opacity = isDragging ? 0 : 1;
        return (
                <div style={{opacity}}>
                    <div className='card bwm-card'>
                        <img className='card-img-top' src={image} alt=''></img>
                        <div className='card-block'>
                            <p className='card-text'>{this.state.editing ? this.renderForm() : this.renderDisplay()}
                            </p>
                        </div>
                        <button className='btn btn-danger' onClick={() => removeImage(imageInfo)}>delete me</button>
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