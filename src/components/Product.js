import React, {Component} from 'react';
import '../style/css/Product.css';
import {
  ENERGY
} from '../text/EN/en-gb';

class Product extends Component{
  render(){
    return(
      <div>
        <div className={(this.props.itemFound && this.props.selectedId) ? "product-box product-selected" : "product-box"}>
          <div className="product-details">
              <div onClick={this.props.selectHandlder} data-productid = {this.props.productId}>
                  <div className="product-name">
                    <p>{this.props.productName}</p>
                  </div>
                  <div className="product-short-details-container">
                      <div className="product-image">
                        <img src={this.props.productImage} alt="product" />
                      </div>
                      <div className="product-short-descr">
                          <div>
                            <span className={(this.props.UnitOfSale === 3) ? "product-energy-loose" : "product-energy"}>{this.props.productEnergy}</span>
                            <span className={(this.props.UnitOfSale === 3) ? "product-energy-units-loose" : "product-energy-units"}> {ENERGY}</span>
                          </div>
                          <div><span>{this.props.quantity} </span>
                          <span className={(this.props.UnitOfSale === 3) ? "product-weight-units-loose" : ""}>{this.props.weightUnits}</span></div>
                          <div>
                            <span>£</span><span>{this.props.price}</span>
                          </div>
                      </div>
                  </div>
              </div>
          </div>
          <div className="product-quantity" >
            <span>Quantity </span>
            <input
              defaultValue="1"
              className="inputQuantity"
              maxLength="2"
              data-productid = {this.props.productId}
              onChange = {this.props.handleProductChangeQuantity}
            />
          </div>
        </div>
      </div>
    )
  }
}
export default Product;
