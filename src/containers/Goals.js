import _ from 'lodash';
import React, {Component} from 'react';
import {connect} from 'react-redux';
import Header from '../components/Header';
import {
  updateConsumptionTarget,
  removeCharFromConsumptionTarget,
  setShoppingPeriod,
  removeFromSelected,
  sendSelectedToServer
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
    this.setState({
      selectedListShow : !this.state.selectedListShow
    });
    this.props.sendSelectedToServer(this.props.selectedItems);

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

  }

  render(){
    const selectedItems = _.map(this.props.selectedItems, (item, i) =>{
      if(item.name && item.productQuantity > 0){
        return  <SelectedItem key={item.id} text={item.name + " x " + item.productQuantity}
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
            <p>
              Daily target (calories)
            </p>
            <div>
              <input type="text" maxLength="4" id="consumptionTarget" onKeyDown={this.checkTargetInput.bind(this)}
                value={this.props.consumptionTarget}
                placeholder="calories"
              />
            </div>
            <p className="target-error" >{this.state.consumptionTargetError}</p>
          </div>
          <div>
            <p>Weekly limit (calories)</p>
            <input readOnly id="basketLimit" value={this.props.weeklyTotal}/>
          </div>
          <div>
            <p>How often do you shop</p>
            <select id="howOftenShop" value={this.props.howOftenShopValue} onChange={this.handleHowOftenShopChange.bind(this)}>
              <option val="0" defaultValue hidden="hidden">Select...</option>
              <option val="7">Every Day</option>
              <option val="3">Three times per week</option>
              <option val="2">Twice a week</option>
              <option val="1">Once a week</option>
            </select>
          </div>
          <div className="highlight-box">
            <p>Next shopping limit</p>
            <input readOnly value={this.props.nextShoppingLimit + " cal."}
              className="shopping-limit"
            />
            <p className="target-error" ></p>
          </div>
          <div className="shopping-basket-total">
            <p>Basket</p>
            <input readOnly id="basketTotal" value={this.props.basketTotal + " cal."}
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
  return {
    consumptionTarget : state.goals.consumptionTarget,
    weeklyTotal : state.goals.weeklyTotal,
    basketTotal: state.search.basketTotal,
    overLimit : state.search.overLimit,
    nextShoppingLimit : state.goals.nextShoppingLimit,
    selectedItems : state.search.selectedItems,
  }
}
const mapPropsToActions = {
  updateConsumptionTarget,
  removeCharFromConsumptionTarget,
  setShoppingPeriod,
  removeFromSelected,
  sendSelectedToServer
};
export default connect(mapStateToProps, mapPropsToActions)(Goals);
