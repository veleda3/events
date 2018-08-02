import React, { Component } from 'react';
import {Header} from './share/Header'
import ImageListing from './components/imageRentals/imageListing';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Header />
        <div className='container'>
          <ImageListing />
        </div>
      </div>
    );
  }
}

export default App;
