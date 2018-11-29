import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Asset extends Component {
  static propTypes = {
    assetInfo: PropTypes.object.isRequired,
  }

  render() {
    let quantity = this.props.assetInfo.quantity ? (this.props.assetInfo.quantity).toLocaleString() : 0;

    return (
      <tr className="asset">
        <td />
        <td>{this.props.assetInfo.asset_class}</td>
        <td>{this.props.assetInfo.investment_date}</td>
        <td>$ {quantity}</td>
        <td>$ {(this.props.assetInfo.cost.$).toLocaleString()}</td>
      </tr>
    )
  }
}

export default Asset;
