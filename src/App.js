import React, { Component } from 'react'
import {Provider} from 'react-redux';
import store from './redux/store'
import ApolloClient from 'apollo-boost'
import {ApolloProvider} from 'react-apollo'
import ImageListing from './components/imageRentals/imageListing'
import './App.css';


const client = new ApolloClient({
  uri: 'http://localhost:4000/graphql'
})

class App extends Component {

  render() {
    return (
      <ApolloProvider client={client}>

          <div className="App">
            <div className='container'>
              <ImageListing />
              <div className="card-container">
              </div>
            </div>
          </div>

      </ApolloProvider>
    );
  }
}

export default App;
