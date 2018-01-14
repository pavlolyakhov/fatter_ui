import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import * as actions from '../actions';
import {BRAND_NAME} from '../config';
import '../style/css/Header.css';

class Header extends Component{

  handleSignoutClick(){
    this.props.signoutUser();
  }
  toggleSigninButtonText(){
    if(this.props.authenticated){
      //localStorage.setItem("token", null);
      return (
        <li className="nav-item" key="0">
          {/* <Link className="nav-link" to="/signout">Sign out</Link> */}
          <a className="nav-link" onClick={this.handleSignoutClick.bind(this)}>Sign out</a>
        </li>
      )
    }
    else{
      return [
        <li className="nav-item" key="3">
          <Link className="nav-link" to="/goals" >Sign in as Guest</Link>
        </li>,
        <li className="nav-item" key="1">
          <Link className="nav-link" to="/signin" >Sign in</Link>
        </li>
      ]
    }
  }

  render(){
    return(
      <nav className="navbar navbar-default navbar-fixed-top">
        <div className="container-fluid">
          <div className="navbar-header">
            <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
              <span className="sr-only">Toggle navigation</span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
            </button>
            <Link className="navbar-brand" to="/">{BRAND_NAME}</Link>
          </div>
          <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
            <ul className="nav navbar-nav auth-controls">
              {this.toggleSigninButtonText()}
            </ul>
          </div>
        </div>
      </nav>
    )
  }
}

function mapStateToProps(state){
  return{authenticated : state.auth.authenticated}
}
export default connect(mapStateToProps, actions)(Header);
