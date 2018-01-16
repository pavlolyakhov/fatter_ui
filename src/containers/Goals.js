import _ from 'lodash';
import React, {Component} from 'react';
import {connect} from 'react-redux';
import Header from '../components/Header';
import {
  updateConsumptionTarget,
  removeCharFromConsumptionTarget,
  setShoppingPeriod,
  removeFromSelected,
  sendSelectedToServer,
  getUserData
} from '../actions/index';
import Search from './Search';
import '../style/css/Goals.css';
import SelectedList from '../components/SelectedList';
import SelectedItem from '../components/SelectedItem';

class Goals extends Component{
  constructor(props){
    super(props);
    this.state = {
      consumptionTargetError : "",
      selectedListShow : false
    }
  }

  handleShowSelectedClick(){
    if(this.state.selectedListShow){
      const goals = {
        consumptionTarget : this.props.consumptionTarget,
        weeklyTotal : this.props.weeklyTotal,
        basketTotal: this.props.basketTotal,
        overLimit : this.props.overLimit,
        nextShoppingLimit : this.props.nextShoppingLimit,
        // howOftenShopValue : this.props.howOftenShopValue
      }
      this.props.sendSelectedToServer(this.props.selectedItems, goals);
    }
    this.setState({
      selectedListShow : !this.state.selectedListShow
    });
  }

  checkTargetInput(input){
    const key = input.key
    const val = input.currentTarget.value
    const valLength = val.length;
    if(key === "Backspace"){
      this.props.removeCharFromConsumptionTarget();
    }
    else if(!isNaN(key) && valLength < 4){
      this.props.updateConsumptionTarget(input.key);
      //this.props.recalculateBasketTotal(this.props.weeklyTotal);
      this.setState({consumptionTargetError : ""})
    }
    else{
      this.setState({consumptionTargetError : "Only digits"});
    }
  }

  handleHowOftenShopChange(e) {
    console.log('handleHowOftenShopChange', e);
    var selectedOptionValue = e.target.options[e.target.selectedIndex].attributes[0].value;
    this.props.setShoppingPeriod(selectedOptionValue);
  }

  handleRemoveFromSelected(e){
    console.log('handleRemoveFromSelected', e.currentTarget);
    const currentTarget = e.currentTarget;
    const itemId = currentTarget.getAttribute('data-productid');
    this.props.removeFromSelected(itemId);
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
      // howOftenShopValue : this.props.howOftenShopValue
    }
    this.props.sendSelectedToServer(this.props.selectedItems, goals);
  }

  render(){
    const selectedItems = _.map(this.props.selectedItems, (item, i) =>{
      if(item.name && item.productQuantity > 0){
        return  <SelectedItem key={item.id} text={`${item.productQuantity} X ${item.name}`}
          productImage={item.image}
          handleRemove={this.handleRemoveFromSelected.bind(this)}
          itemId={item.id}
         />
      }
    });
    return(
      <div className="goals-container"  ref={ (divElement) => this.goalsContainer = divElement}>
        <Header />
        <div className="goals-page">
          <div>
            <p className="goals-setting-text">
              Daily target
            </p>
            <div>
              <input type="text" maxLength="4" id="consumptionTarget" onKeyDown={this.checkTargetInput.bind(this)}
                value={this.props.consumptionTarget}
                placeholder="... kcal"
              />
            </div>
            <p className="target-error" >{this.state.consumptionTargetError}</p>
          </div>
          <div>
            <p className="goals-setting-text">Shopping</p>
            <select id="howOftenShop" value={this.props.howOftenShopValue} onChange={this.handleHowOftenShopChange.bind(this)}>
              <option val="0" defaultValue hidden="hidden">Select...</option>
              <option val="7">Every Day</option>
              <option val="3">Three times per week</option>
              <option val="2">Twice a week</option>
              <option val="1">Once a week</option>
            </select>
          </div>
          <div>
            <p  className="goals-setting-text">Weekly limit</p>
            <input readOnly id="basketLimit" value={`${this.props.weeklyTotal} kcal`}
            placeholder="... kcal" />
          </div>

          <div className="highlight-box">
            <p className="goals-setting-text">Next shopping limit</p>
            <input readOnly value={this.props.nextShoppingLimit + " kcal"}
              className="shopping-limit"
            />
            <p className="target-error" ></p>
          </div>
          <div className="shopping-basket-total">
            <p>Basket</p>
            <input readOnly id="basketTotal" value={this.props.basketTotal + " kcal"}
              className={(this.props.overLimit) ? "basket-over-limit" : ""}
            />
            <p className="target-error" >{(this.props.overLimit) ? "Basket is over limit" : ""}</p>
            <div className="basketActions">
              <button id="btnSaveBasket" className="btn btn-default" onClick={this.handleShowSelectedClick.bind(this)}>Show Shopping List</button>
            </div>
          </div>
        </div>
        <Search />
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
    nextShoppingLimit : state.goals.nextShoppingLimit,
    selectedItems : state.search.selectedItems,
    // howOftenShopValue : state.goals.howOftenShopValue
  }
}
const mapPropsToActions = {
  updateConsumptionTarget,
  removeCharFromConsumptionTarget,
  setShoppingPeriod,
  removeFromSelected,
  sendSelectedToServer,
  getUserData
};
export default connect(mapStateToProps, mapPropsToActions)(Goals);
