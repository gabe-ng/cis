import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Asset from "./Asset";

class Investment extends Component {
  static propTypes = {
    investment: PropTypes.object.isRequired,
  }

  state = {
      assetsShown: this.props.showing,
  }

  componentDidUpdate = prevProps => {
    if (prevProps !== this.props) {
        this.setState({
            assetsShown: this.props.showing,
        })
    }
  }
  
  toggleAssets = () => {
      this.setState({
          assetsShown: !this.state.assetsShown,
      })
  }

  render() {

    let shares = this.props.investment.issued_assets.reduce((acc, asset) => acc + asset.quantity, 0).toLocaleString();
    let cost = this.props.investment.issued_assets.reduce((acc, asset) => acc + asset.cost.$, 0).toLocaleString();
    let assets = this.props.investment.issued_assets.map(asset => <Asset asset={asset} key={asset.id}/>)

    let arrow;
    this.state.assetsShown === true ?
        arrow = <i className="fas fa-caret-down arrow"></i> :
        arrow = <i className="fas fa-caret-right arrow"></i>

    return (
        <React.Fragment>
            <tr className="investment">
                <td><span className="expand" onClick={this.toggleAssets}>{this.props.investment.name}{arrow}</span></td>
                <td></td>
                <td></td>
                <td>$ {shares}</td>
                <td>$ {cost}</td>
            </tr>
            {this.state.assetsShown ? [assets] : null}
        </React.Fragment>
    )
  }
}

export default Investment;
