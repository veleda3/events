import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
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
          <Router>
            <div className="App">
              <div className='container'>
                <ImageListing Route={Route} Link={Link}/>
                <div className="card-container">
                </div>
              </div>
            </div>
          </Router>
      </ApolloProvider>
    );
  }
}

export default App;
