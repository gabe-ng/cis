import React, { Component } from 'react';
import DatePicker from "react-datepicker";
import Investment from './Investment';

import "react-datepicker/dist/react-datepicker.css";

class App extends Component {
  state = {
    investments: [],
    showingAssets: true,
    date: new Date(),
    formattedDate: null
  };

  componentDidMount = () => {
    this.getInvestments();
  };

  // Handles API call for investments
  getInvestments = async () => {
    let formattedDate = this.state.formattedDate
      ? this.state.formattedDate
      : this.convertDate(this.state.date);

    let response = await fetch(
      "https://gist.githubusercontent.com/cranium/d8b83184bf0750f2c834760b7c9203dc/raw/a73a70716951f77b90e84b8848ff1fee46938dd1/soi.json?date=" +
        formattedDate
    );
    let investments = await response.json();

    this.setState({
      investments,
      formattedDate
    });
  };

  // Method to convert date to YYYY-MM-DD format
  convertDate = date => {
    let y = date.getFullYear().toString();
    let m = (date.getMonth() + 1).toString();
    let d = date.getDate().toString();

    d.length === 1 && (d = "0" + d);
    m.length === 1 && (m = "0" + m);

    let yyyymmdd = `${y}-${m}-${d}`;

    return yyyymmdd;
  };
  
  filterAssets = assets => assets
    .filter(asset => {
      return this.convertDateToMS(asset.investment_date) <= this.convertDateToMS(this.state.formattedDate)});

  // Collapse all investment assets
  collapseAll = () => {
    this.setState({
      showingAssets: false
    });
  };

  // Expand all investment assets
  expandAll = () => {
    this.setState({
      showingAssets: true
    });
  };

  // Set date to user input
  setDate = date => {
    this.setState({
      date: date,
      formattedDate: this.convertDate(date)
    });
  };

  convertDateToMS = date => {
    let dateToString = String(date);

    if (dateToString[2] === "/") { 
      // Split and reverse order from MM-DD-YYYY to YYYY-DD-MM
      let reversedDate = dateToString.split("/").reverse();
      // Swap the second and third element so order is YYYY-MM-DD
      let temp = reversedDate[1];
      reversedDate[1] = reversedDate[2];
      reversedDate[2] = temp;

      let newDate = reversedDate.join("-");

      return new Date(newDate).getTime();
    } else {
      return new Date(dateToString).getTime();
    }

  };

  render() {
    let investments = this.state.investments.map(investment => (
      <Investment
        investmentInfo={investment}
        key={investment.id}
        showing={this.state.showingAssets}
        selectedDate={this.state.formattedDate}
        convertDateToMS={this.convertDateToMS}
        filterAssets={this.filterAssets}
      />
    ));
    
    // Find total cost by filtering assets by date then summing up remaining assets' cost
    let totalCost = this.state.investments
      .reduce((acc, investment) => {
        let assetCost = this.filterAssets(investment.issued_assets).reduce((acc, asset) => acc + asset.cost.$, 0);
        return acc + assetCost}, 0)
      .toLocaleString();

    let totalShares = this.state.investments
      .reduce((acc, investment) => {
        let assetShares = this.filterAssets(investment.issued_assets).reduce((acc, asset) => acc + asset.quantity, 0);
        return acc + assetShares}, 0)
      .toLocaleString();

    return <div className="app">
        <h1 className="title">Carta Investor Services</h1>
        <div className="options">
          <button onClick={this.collapseAll}>Collapse All</button>
          <button onClick={this.expandAll}>Expand All</button>
          <DatePicker selected={this.state.date} onChange={this.setDate} todayButton={"Today"} className="date-picker" />
          <button onClick={this.getInvestments}>Search</button>
        </div>
        <table className="container">
          <tbody>
            <tr>
              <th>
                <h1>Investment</h1>
              </th>
              <th>
                <h1>Asset</h1>
              </th>
              <th>
                <h1>Investment Date</h1>
              </th>
              <th>
                <h1>Shares</h1>
              </th>
              <th>
                <h1>Cost</h1>
              </th>
            </tr>
            {investments}
            <tr className="total">
              <td>Total</td>
              <td />
              <td />
              <td>$ {totalShares}</td>
              <td>$ {totalCost}</td>
            </tr>
          </tbody>
        </table>
      </div>;
  }
}

export default App;
