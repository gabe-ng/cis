import React, { Component } from 'react';

class App extends Component {
  state = {
    investments: [],
  };

  componentDidMount = async () => {
    let response = await fetch("https://gist.githubusercontent.com/cranium/d8b83184bf0750f2c834760b7c9203dc/raw/a73a70716951f77b90e84b8848ff1fee46938dd1/soi.json");
    let investments = await response.json();
    this.setState({
      investments
    })
  }
  
  render() {
    console.log(this.state);
    return (
      <div>
        hello 
      </div>
    );
  }
}

export default App;
