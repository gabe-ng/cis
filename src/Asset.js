import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Asset extends Component {
  static propTypes = {
    asset: PropTypes.object.isRequired,
  }

  state = {
      isShowing: true,
  }

  render() {
    return (
        <tr>
            <td></td>
            <td>{this.props.asset.asset_class}</td>
            <td>{this.props.asset.investment_date}</td>
            <td>$ {this.props.asset.quantity}</td>
            <td>$ {this.props.asset.cost.$}</td>
        </tr>
    )
  }
}

export default Asset;
