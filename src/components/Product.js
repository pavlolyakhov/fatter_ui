import React, {Component} from 'react';
import '../style/css/Product.css';
import {
  ENERGY, GRAMS
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
                            <span className={(this.props.UnitOfSale === 3) ? "product-energy-loose" : "product-energy"}>
                              {this.props.productEnergy}
                            </span>
                            <span className={(this.props.UnitOfSale === 3) ? "product-energy-units-loose" : "product-energy-units"}>
                               {ENERGY}
                             </span>
                          </div>
                          <div>
                            <span>
                            {(this.props.UnitOfSale === 3) ? this.props.quantity : ""}
                            </span>
                            <span className={(this.props.UnitOfSale === 3) ? "product-weight-units-loose" : ""}>
                              {(this.props.UnitOfSale === 3) ? ` per 100 ${GRAMS}` : ""  }
                            </span></div>
                          <div>
                            <span>£</span><span>{this.props.price}</span>
                          </div>
                      </div>
                  </div>
              </div>
          </div>
          <div className={(this.props.itemFound && this.props.selectedId) ? "product-quantity" : "product-quantity product-quantity-hidden" }>
            <div className="glyphicon glyphicon-plus product-quantity-control product-control-plus"
              data-productid = {this.props.productId}
              onClick = {this.props.handleProductIncreaseQuantity}>
            </div>
            <div className="product-quantity-container">
              <p className="product-quantity-number">{this.props.productQuantity}</p>
              <p className="product-quantity-units"> {this.props.weightUnits}</p>
            </div>
            <div className="glyphicon glyphicon-minus product-quantity-control product-control-minus"
              data-productid = {this.props.productId}
              onClick={this.props.handleProductReduceQuantity}>
            </div>
            {/* <input
              defaultValue="1"
              className="inputQuantity"
              maxLength="2"
              data-productid = {this.props.productId}
              onChange = {this.props.handleProductChangeQuantity}
            /> */}
          </div>
          {/* <div className="product-quantity" >
            <span>Quantity </span>
            <input
              defaultValue="1"
              className="inputQuantity"
              maxLength="2"
              data-productid = {this.props.productId}
              onChange = {this.props.handleProductChangeQuantity}
            />
          </div> */}
        </div>
      </div>
    )
  }
}
export default Product;
