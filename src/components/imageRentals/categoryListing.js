import React from 'react'
import HTML5Backend from 'react-dnd-html5-backend'
import Card from './imageCard'


const update = require('immutability-helper');

export default class CategoryListing extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            cards: this.props.images
        }  
    this.removeImage = this.removeImage.bind(this)
    }
    

    moveCard = (dragIndex, hoverIndex) => {
        const { cards } = this.state
        const dragCard = cards[dragIndex]
        this.setState(
            update(this.state, {
                cards: {
                $splice: [[dragIndex, 1], [hoverIndex, 0, dragCard]],
                },
            }),
        )
    }

    renderImages() {
        const {profileImage} = this.props
        return this.props.images.map((image, index) => {
            return  <Card 
                        key={`image-${index}`}  
                        image={image.image}
                        description={image.description}
                        Ranking={image.Ranking}
                        createdAt={image.createdAt}
                        profileImage={profileImage}
                        moveCard={this.moveCard}
                        removeImage={() => this.removeImage(image)}
                    />
            })
    }

    removeImage(e) {
        this.setState({cards: this.state.cards.filter( image => { 
            return image !== e 
        })});
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

