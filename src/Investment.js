import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Asset from "./Asset";

class Investment extends Component {
  static propTypes = {
    investment: PropTypes.object.isRequired,
  }

  state = {
      assetsShown: false,
  }

  render() {
    let shares = this.props.investment.issued_assets.reduce((acc, x) => acc + x.quantity, 0);
    let cost = this.props.investment.issued_assets.reduce((acc, x) => acc + x.cost.$, 0);

    let assets = this.props.investment.issued_assets.map(asset => <Asset asset={asset} />)

    return (
        <React.Fragment>
            <tr>
                <td>{this.props.investment.name}</td>
                <td></td>
                <td></td>
                <td>$ {shares}</td>
                <td>$ {cost}</td>
            </tr>
            
        </React.Fragment>
    )
  }
}

export default Investment;
