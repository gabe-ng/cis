import React, { Component } from 'react';
import Investment from './Investment';

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

    let investments = this.state.investments.map(investment => <Investment investment={investment} key={investment.id}/>)

    return (
      <table>
        <tbody>
          <tr>
            <th><h1>Investment</h1></th>
            <th><h1>Asset</h1></th>
            <th><h1>Investment Date</h1></th>
            <th><h1>Shares</h1></th>
            <th><h1>Cost</h1></th>
          </tr>
          {investments}
        </tbody>
      </table>
    );
  }
}

export default App;
