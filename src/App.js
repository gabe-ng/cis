import React, { Component } from 'react';
import DatePicker from './DatePicker';
import Investment from './Investment';

class App extends Component {
  state = {
    investments: [],
    showingAll: true,
  };

  componentDidMount = async () => {
    let response = await fetch("https://gist.githubusercontent.com/cranium/d8b83184bf0750f2c834760b7c9203dc/raw/a73a70716951f77b90e84b8848ff1fee46938dd1/soi.json");
    let investments = await response.json();
    this.setState({
      investments,
    })
  }

  collapseAll = () => {
    this.setState({
      showingAll: false,
    })
  }

  expandAll = () => {
    this.setState({
      showingAll: true,
    })
  }
  
  render() {

    let investments =
      this.state.investments.map(investment => <Investment investment={investment} key={investment.id} showingAll={this.state.showingAll} />)

    return (
      <div className="app">
      <h1 className="title">Carta Investor Services</h1>
        <div className="options">
        <button onClick={this.collapseAll}>Collapse All</button>
        <button onClick={this.expandAll}>Expand All</button>
        <DatePicker />
      </div>
        <table className="container">
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
      </div>
    );
  }
}

export default App;
