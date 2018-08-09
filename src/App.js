import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import ApolloClient from 'apollo-boost'
import {ApolloProvider} from 'react-apollo'
import ImageListing from './components/imageRentals/imageListing'
import {Header, Nav} from './components/header/header'
import './App.css';


const client = new ApolloClient({
  uri: 'http://localhost:4000/graphql'
})

class App extends Component {
  static defaultProps = {
    bottomBorderWidth: 2,
    headerHeight: 200,
    fadeInDistance: 40
  };

  render() {
    return (
      <ApolloProvider client={client}>
          <Router>
            <div className="App">
              <div className='container'>
              <Header borderBottomWidth={ this.props.bottomBorderWidth } Link={Link} />
              <ImageListing Route={Route}/>
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
