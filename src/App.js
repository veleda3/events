import React, { Component } from 'react'
import {Provider} from 'react-redux';
import HTML5Backend from 'react-dnd-html5-backend'
import store from './redux/store'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import ImageListing from './components/imageRentals/imageListing'
import Card from './components/imageRentals/card'
import './App.css';




class App extends Component {

  render() {
    return (
      <Provider store={store}>
      <div className="App">
        <div className='container'>
          <ImageListing />
          <div className="card-container">
          </div>
        </div>
      </div>
      </Provider>
    );
  }
}

export default App;
