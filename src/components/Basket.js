import React, {Component} from 'react';
import '../style/css/Basket.css';

class Basket extends Component {

  render(){
    return(
        <div className="shopping-basket-total">
          <p className="shopping-basket-header">Basket</p>
          <input readOnly id="basketTotal" value={this.props.basketTotal + " kcal"}
            className={(this.props.overLimit) ? "basket-over-limit" : ""}
          />
          <p className="target-error" >{(this.props.overLimit) ? "Basket is over limit" : ""}</p>
          <div className="basketActions">
            <button id="btnSaveBasket" className="btn btn-default" onClick={this.props.handleClick}>Shopping List</button>
          </div>
        </div>
    )
  }
}

export default Basket;
