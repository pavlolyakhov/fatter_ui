import React, {Component} from 'react'
import '../style/css/SelectedItem.css'

class SelectedItem extends Component{

  render(){
    return(
      <li className="selectedItem" >
        <img src={this.props.productImage} alt="product"/>
        <span className="selected-basket-item-text">{this.props.text}</span>
        <span className="glyphicon glyphicon-remove selected-item-remove"
          onClick={this.props.handleRemove}
          data-productid={this.props.itemId}></span>
      </li>
    )
  }
}
export default SelectedItem;
