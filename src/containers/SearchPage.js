import _ from 'lodash';
import React, {Component} from 'react';
import {connect} from 'react-redux';
import {
  updateConsumptionTarget,
  removeCharFromConsumptionTarget,
  removeFromSelected,
  sendSelectedToServer,
  getUserData,
  updateProductQuantity,
  markItemBought
} from '../actions/index';
import Header from '../components/Header';
import Goals from './Goals';
import Search from './Search';
import SelectedList from '../components/SelectedList';
import SelectedItem from '../components/SelectedItem';
import Basket from '../components/Basket';
import '../style/css/SearchPage.css';

class SearchPage extends Component{
  constructor(props){
    super(props);
    this.state = {
      consumptionTargetError : "",
      selectedListShow : false
    }
  }

  componentDidMount(){
    // create and save guest ID in localStorage if none exists
    // save user selections in db
    // get user guest id on initial load, only on initial load!
    // update components with user info from db.
    const guestId = localStorage.getItem('guestId');
    if(guestId){
      this.props.getUserData(guestId);
    }
  }
  componentWillUnmount(){
    // save user selections
    const goals = {
      consumptionTarget : this.props.consumptionTarget,
      weeklyTotal : this.props.weeklyTotal,
      basketTotal: this.props.basketTotal,
      overLimit : this.props.overLimit,
      nextShoppingLimit : this.props.nextShoppingLimit,
    }
    this.props.sendSelectedToServer(this.props.selectedItems, goals);
  }

  handleShowSelectedClick(){
    if(this.state.selectedListShow){
      const goals = {
        consumptionTarget : this.props.consumptionTarget,
        weeklyTotal : this.props.weeklyTotal,
        basketTotal: this.props.basketTotal,
        overLimit : this.props.overLimit,
        nextShoppingLimit : this.props.nextShoppingLimit,
      }
      this.props.sendSelectedToServer(this.props.selectedItems, goals);
    }
    this.setState({
      selectedListShow : !this.state.selectedListShow
    });
  }

  handleRemoveFromSelected(e){
    console.log('handleRemoveFromSelected', e.currentTarget);
    const currentTarget = e.currentTarget;
    const itemId = currentTarget.getAttribute('data-productid');
    this.props.removeFromSelected(itemId);
  }

  handleProductIncreaseQuantity(e){
    const currentTarget = e.currentTarget;
    const itemId = currentTarget.getAttribute('data-productid');
    this.props.updateProductQuantity(itemId, "+", this.props.weeklyTotal);
  }

  handleProductReduceQuantity(e){
    const currentTarget = e.currentTarget;
    const itemId = currentTarget.getAttribute('data-productid');
    this.props.updateProductQuantity(itemId, "-", this.props.weeklyTotal);
  }

  handleMarkBought(e){
    const currentTarget = e.currentTarget;
    const itemId = currentTarget.getAttribute('data-productid');
    this.props.markItemBought(itemId)
  }

  render(){
    const selectedItems = _.map(this.props.selectedItems, (item, i) =>{
      if(item.name && item.productQuantity > 0){
        return  <SelectedItem key={item.id}
          text={item.name}
          quantity={item.productQuantity}
          weightUnits = {(item.UnitOfSale === 3) ? "grams" : ""}
          productImage={item.image}
          handleRemove={this.handleRemoveFromSelected.bind(this)}
          itemId={item.id}
          handleProductIncreaseQuantity = {this.handleProductIncreaseQuantity.bind(this)}
          handleProductReduceQuantity = {this.handleProductReduceQuantity.bind(this)}
          handleMarkBought = {this.handleMarkBought.bind(this)}
          isBought = {(item.isBought) ? true : false}
          />
      }
    });
    return(
      <div className="search-page-container">
        <Header />
        <Goals />
        <Search handleProductIncreaseQuantity = {this.handleProductIncreaseQuantity.bind(this)}
        handleProductReduceQuantity = {this.handleProductReduceQuantity.bind(this)} />
        <Basket handleClick={this.handleShowSelectedClick.bind(this)} basketTotal={this.props.basketTotal}
          overLimit ={this.props.overLimit}
        />
        <SelectedList selectedListShow={this.state.selectedListShow}
          handleClick={this.handleShowSelectedClick.bind(this)}>
          {selectedItems}</SelectedList>
      </div>
    )
  }
}
function mapStateToProps(state){
  console.log('state.goals.howOftenShopValue', state.goals.howOftenShopValue);
  return {
    consumptionTarget : state.goals.consumptionTarget,
    weeklyTotal : state.goals.weeklyTotal,
    basketTotal: state.search.basketTotal,
    overLimit : state.search.overLimit,
    selectedItems : state.search.selectedItems,
  }
}
const mapPropsToActions = {
  updateConsumptionTarget,
  removeCharFromConsumptionTarget,
  removeFromSelected,
  sendSelectedToServer,
  getUserData,
  updateProductQuantity,
  markItemBought
};
export default connect(mapStateToProps, mapPropsToActions)(SearchPage);
