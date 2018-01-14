import React, {Component} from 'react';
import {connect} from 'react-redux';
import {reduxForm, Field} from 'redux-form';
import * as actions from '../../actions';
import '../../style/css/SignupForm.css';

class SignupForm extends Component{

  handleFormSubmit({email, password}){
    this.props.signupUser({email, password}, () => {
      this.props.history.push("/goals");
    });
  }

  renderAlert(){
    if(this.props.errorMessage){
      return(
        <div className="alert alert-danger">
          <strong>Oops!</strong> {this.props.errorMessage}
        </div>
      )
    }
  }


  renderField(field){
    //const {meta : { touched, error}} = field;  //destructuring and assigning
    const fieldClassName = `form-group ${field.meta.touched && field.meta.error ? 'has-danger' : ''}`
    return(
      <div className={fieldClassName}>
        <label>{field.label}</label>
        <input className="form-control"
          type="text"
          {...field.input}
        />
        <div className="text-help">
          {field.meta.touched ? field.meta.error : ""}
        </div>
      </div>
    )
  }
  renderPasswordField(field){
    const fieldClassName = `form-group ${field.meta.touched && field.meta.error ? 'has-danger' : ''}`
    return(
      <div className={fieldClassName}>
        <label>{field.label}</label>
        <input className="form-control"
          type="password"
          {...field.input}
        />
        <div className="text-help">
          {field.meta.touched ? field.meta.error : ""}
        </div>
      </div>
    )
  }


  render(){
    const {handleSubmit} = this.props;
    return(
      <div className="signupForm">
        <form className="form" onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
          <div>
          <Field
            className="emailField"
            label="Email"
            name="email"
            component={this.renderField}
          />
          <Field
            label="Password"
            name="password"
            component={this.renderPasswordField}
          />
          <Field
            label="Confirm Password"
            name="passwordConfirm"
            component={this.renderPasswordField}
          />
          {this.renderAlert()}
          <button type="submit" className="btn btn-primary">Submit</button>
          <div>
            <a onClick={this.props.signupClick}>Already registered? Sign in here.</a>
          </div>
        </div>
        </form>
      </div>
    )
  }
}
function validate(formProps){
  const errors = {};

  if(!formProps.email){
    errors.email = "Please enter an email";
  }
  if(!formProps.password){
    errors.password = "Please enter a password";
  }
  if(!formProps.passwordConfirm){
    errors.passwordConfirm = "Please enter a password confirmation";
  }

  if(formProps.password !== formProps.passwordConfirm){
    errors.passwordConfirm = "Passwords must match";
    errors.password = "Passwords must match";
  }
  return errors;
}

function  mapStateToProps(state){
  return {errorMessage: state.auth.error}
}
export default reduxForm({
  form: 'signup',
  fields: ['email', 'password', 'passwordConfirm'],
  validate : validate
})(connect( mapStateToProps, actions)(SignupForm));
