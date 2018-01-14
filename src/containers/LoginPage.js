import React, {Component} from 'react';
import {connect} from 'react-redux';
import Header from '../components/Header';
import Signin from '../components/auth/SigninForm';
import Signup from '../components/auth/SignupForm';

import '../style/css/LoginPage.css';

class LoginPage extends Component{
constructor(props){
  super(props);
    this.state = {
      alreadyRegistered : true
    }
    this.handleSignupSelection = this.handleSignupSelection.bind(this);
}

  handleSignupSelection(){
    this.setState({
      alreadyRegistered : (this.state.alreadyRegistered) ? false : true
    })
  }

  render(){
    const history = this.props.history;
    if(!this.props.authenticated){
      return(
      <div className="login-page">
        <Header />
          <div>
          {(this.state.alreadyRegistered) ?
            <Signin signupClick={this.handleSignupSelection} history={history} /> :
            <Signup signupClick={this.handleSignupSelection} history={history} />}
          </div>
      </div>
    )
    }
    else{
      return(
      <div className="login-page">
        <Header />
      </div>)
    }
  }
}
function mapStateToProps(state){
  return {
    authenticated : state.auth.authenticated
  }
}

export default connect(mapStateToProps, null)(LoginPage);
