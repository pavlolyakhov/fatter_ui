import _ from 'lodash';
import React, {Component} from 'react';
import {connect} from 'react-redux';
import {
  getProducts,
  updateSelected,
  updateProductQuantity,
} from '../actions/index';
import {GRAMS} from '../text/EN/en-gb';
import Product from '../components/Product';
import {searchOffset, searchTake, scrollThrottleDelay} from '../config';
import '../style/css/Search.css';

class Search extends Component{
  constructor(props){
    super(props);
    this.state = {
      searchText : "tesco",
      searchBtnText : "Search",
      newSearch : true
    }
    this.getOffset = this.getOffset.bind(this);
    this.checkWindowPosition = this.checkWindowPosition.bind(this);
  }

  componentDidMount() {
      window.addEventListener('scroll', _.throttle(this.checkWindowPosition, scrollThrottleDelay));
  }
  componentWillUnmount() {
    //window.removeEventListener('scroll');
  }
  checkWindowPosition(){
    var scrollHeight = document.body.scrollHeight ,
      scrollTop = window.pageYOffset,
      clientHeight = window.innerHeight;
      const scrollBottom = scrollHeight - clientHeight - scrollTop;
        if (scrollBottom <= 10) {
            console.log("LOAD MORE");
            const offset = this.getOffset();
            this.props.getProducts(this.state.searchText, offset);
        }
  }

  handleSearchInput(e){
    this.setState({
      searchText : e.target.value,
      searchBtnText : "Search",
      newSearch : true
    });
  }

  getOffset(){
    let offset = searchOffset;
    if(this.props.searchText === this.state.searchText ){
      offset = this.props.searchOffset + searchTake;
    }
    return offset;
  }

  handleSearchClick(e){
    console.log('handleSearchClick',e);
    e.preventDefault();
    this.setState({
      searchBtnText : "Find more"
    });
    const offset = this.getOffset();
    this.props.getProducts(this.state.searchText, offset);
  }

  handleSelectClick(e, quantity){
    const target =  e.target;
    const currentTarget = e.currentTarget;
    if(!target.classList.contains('inputQuantity')){    // click was NOT on Quantity selection, not to select product
      const itemId = currentTarget.getAttribute('data-productid');
      this.props.updateSelected(itemId, this.props.nextShoppingLimit);
    }
  }

  // handleProductIncreaseQuantity(e){
  //   const currentTarget = e.currentTarget;
  //   const productQuantity = currentTarget.value;
  //   const itemId = currentTarget.getAttribute('data-productid');
  //   const btnAction = currentTarget.getAttribute('data-action');
  //   this.props.updateProductQuantity(itemId, productQuantity, this.props.nextShoppingLimit);
  // }
  handleProductIncreaseQuantity(e){
    const currentTarget = e.currentTarget;
    const itemId = currentTarget.getAttribute('data-productid');
    this.props.updateProductQuantity(itemId, "+", this.props.nextShoppingLimit);
  }

  handleProductReduceQuantity(e){
    const currentTarget = e.currentTarget;
    const itemId = currentTarget.getAttribute('data-productid');
    this.props.updateProductQuantity(itemId, "-", this.props.nextShoppingLimit);
  }

  render(){
    const db = this.props.products;
    const selected = this.props.selectedItems;
    const keys = Object.keys(db);
    const items = keys.map((key, i) => {
      return <Product
        key = {key}
        productName = {db[key].name}
        productImage = {db[key].image}
        productEnergy = {db[key].productEnergy}
        price = {db[key].price}
        selectHandlder = {this.handleSelectClick.bind(this)}
        productId = {db[key].id}
        itemFound = {(selected[key]) ? true : false}              //if id key is found in selected -> returns true
        selectedId = {(selected[key]) ? selected[key].id : ""}
        handleProductIncreaseQuantity = {this.handleProductIncreaseQuantity.bind(this)}
        handleProductReduceQuantity = {this.handleProductReduceQuantity.bind(this)}
        tpnb = {db[key].tbnp}
        weightUnits = {(db[key].weightUnits.includes("100")) ? GRAMS : (db[key].productQuantity > 1) ? "items" : "item" }
        quantity = {db[key].quantity}
        UnitOfSale = {db[key].UnitOfSale}     // 3 -> means loose item per 100g, come from Tescto API; 1-> packaged ( from observation)
        productQuantity = {(selected[key]) ? selected[key].productQuantity : db[key].productQuantity}
      />
  });
    return(
      <div>
        <div id="searchProducts">
          <div id="searchBar">
            <form onSubmit={this.handleSearchClick.bind(this)}>
            <div className="input-group">
              <input className="form-control" placeholder="Search Tesco products..." onInput={this.handleSearchInput.bind(this)} />
              <span className="input-group-addon btn" id="basic-addon2" onClick={this.handleSearchClick.bind(this)}>{this.state.searchBtnText}</span>
            </div>
            </form>
          </div>
        </div>
        <div id="searchResults">
          {items}
        </div>
      </div>
    )
  }
}

function mapStateToProps({search, goals}){
  return {
    products : search.products,
    selectedItems : search.selectedItems,
    weeklyTotal : goals.weeklyTotal,
    overLimit: search.overLimit,
    nextShoppingLimit : goals.nextShoppingLimit,
    searchOffset : search.searchOffset,
    searchText : search.searchText
  }
}
const mapPropsToActions = {
  getProducts,
  updateSelected,
  updateProductQuantity
};
export default connect(mapStateToProps, mapPropsToActions)(Search);
