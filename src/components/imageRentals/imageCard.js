import React from 'react';
import PropTypes from 'prop-types';
import { findDOMNode } from 'react-dom';



class Card extends React.Component {
    constructor(props) {
        super(props);
        this.state = {editing: false, description: ''}
    }

    componentWillMount() {
        const {description} = this.props
        this.setState({description})
    }

    edit() {
        this.setState({editing: true, cache: this.state.description});
    }
    

    cancel(e) {
        e.preventDefault();
        this.setState({editing: false, cache: undefined});
    }

    handleChange(e) {
        var value = e.target.value;
        this.setState({cache: value});
    }

    renderDisplay() {
        return (
            <div>
                <p>{this.state.description}</p>
                <button onClick={this.edit.bind(this)}>Edit</button>
            </div>
        )
    }
    
    renderForm() {
        const {saveDescription, imageInfo} = this.props
        return (
            <div>
                <form>
                <textarea name="" id="" cols="20" rows="1" value={this.state.cache} onChange={this.handleChange.bind(this)}></textarea>
                <button onClick={saveDescription(imageInfo)}>Save</button>
                    <button onClick={this.cancel.bind(this)}>Cancel</button>
                </form>
            </div>
        )
    }
    
    render() {
        const {
            image, 
            description, 
            createdAt, 
            Ranking, 
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
                            <h6 className='card-subtitle'> image Ranking: {Ranking}</h6>
                            <p className='card-text'>{this.state.editing ? this.renderForm() : this.renderDisplay()}
                            </p>
                            <a href='' className='card-link'>last changed at:{createdAt}</a>
                        </div>
                        <button onClick={() => removeImage(imageInfo)}>delete me</button>
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