import React, {Component} from 'react'
import '../style/css/SelectedItem.css'

class SelectedItem extends Component{

  render(){
    return(
      <li className="selectedItem">
        <span className="glyphicon glyphicon-remove selected-item-remove"
          onClick={this.props.handleRemove}
          data-productid={this.props.itemId}></span>
        <img src={this.props.productImage} alt="product"/>
        <span className={(this.props.isBought) ? "selected-basket-item-text selected-basket-item-text-bought" : "selected-basket-item-text"}
          >{this.props.text} X </span>
        <span className="selected-basket-item-quantity">{this.props.quantity} {this.props.weightUnits}</span>

        <div className="glyphicon glyphicon-plus product-quantity-control-list product-control-plus-list"
          data-productid = {this.props.itemId}
          onClick = {this.props.handleProductIncreaseQuantity}>
        </div>
        <div className="glyphicon glyphicon-minus product-quantity-control-list product-control-minus-list"
          data-productid = {this.props.itemId}
          onClick={this.props.handleProductReduceQuantity}>
        </div>
        <span
          data-productid = {this.props.itemId}
          className={(this.props.isBought) ? "glyphicon glyphicon-ok selected-basket-item-bought" : "glyphicon glyphicon-ok selected-basket-item-notbought"}
          onClick={this.props.handleMarkBought}
          >{this.props.isBought ? " bought" : " bought"}</span>
      </li>
    )
  }
}
export default SelectedItem;
