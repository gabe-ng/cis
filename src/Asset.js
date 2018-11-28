import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Asset extends Component {
  static propTypes = {
    asset: PropTypes.object.isRequired,
  }

  render() {
    let quantity = this.props.asset.quantity ? (this.props.asset.quantity).toLocaleString() : 0;

    return (
      <tr className="asset">
        <td />
        <td>{this.props.asset.asset_class}</td>
        <td>{this.props.asset.investment_date}</td>
        <td>$ {quantity}</td>
        <td>$ {(this.props.asset.cost.$).toLocaleString()}</td>
      </tr>
    )
  }
}

export default Asset;
