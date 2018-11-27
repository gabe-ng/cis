import React, { Component } from 'react';
import PropTypes from 'prop-types';

class App extends Component {
  state = {
    investments: [],
  };

  componentDidMount = async () => {
    let response = await fetch("https://gist.githubusercontent.com/cranium/d8b83184bf0750f2c834760b7c9203dc/raw/a73a70716951f77b90e84b8848ff1fee46938dd1/soi.json");
    let json = await response.json();
  }
  
  render() {
    return (
      <div>
        hello 
      </div>
    );
  }
}

export default App;
