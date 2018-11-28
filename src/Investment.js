import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Asset from "./Asset";

class Investment extends Component {
  static propTypes = {
    investment: PropTypes.object.isRequired,
  }

  state = {
      assetsShown: this.props.showingAll,
  }

  componentDidUpdate = prevProps => {
    if (prevProps !== this.props) {
        this.setState({
            assetsShown: this.props.showingAll,
        })
    }
  }
  
  toggleAssets = () => {
      this.setState({
          assetsShown: !this.state.assetsShown,
      })
  }

  render() {

    let shares = this.props.investment.issued_assets.reduce((acc, x) => acc + x.quantity, 0);
    let cost = this.props.investment.issued_assets.reduce((acc, x) => acc + x.cost.$, 0);
    let assets = this.props.investment.issued_assets.map(asset => <Asset asset={asset} key={asset.id}/>)

    let arrow;
    this.state.assetsShown === true ?
        arrow = <i class="fas fa-caret-down"></i> :
        arrow = <i class="fas fa-caret-right"></i>

    return (
        <React.Fragment>
            <tr className="investment">
                <td>{this.props.investment.name} <span onClick={this.toggleAssets}>{arrow}</span></td>
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
