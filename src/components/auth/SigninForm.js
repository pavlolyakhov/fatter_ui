import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Field, reduxForm} from "redux-form";
import * as actions from '../../actions';
import '../../style/css/SigninForm.css';

class SigninForm extends Component {

  handleFormSubmit({email, password}){
    this.props.signinUser({email, password}, () => {
      this.props.reset();
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
    return (
      <div className="signinForm">
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
          {this.renderAlert()}
          <button type="submit" className="btn btn-primary">Submit</button>
          <div>
            <a onClick={this.props.signupClick}>Not registered? Sign up here.</a>
          </div>
        </div>
        </form>
      </div>
    );
  }
}

function mapStateToProps(state){
  return {
    errorMessage: state.auth.error
  };
}
// export default reduxForm({
//   form: 'signin',
//   fields: ['email', 'password']
// }, mapStateToProps, actions)(Signin);
export default reduxForm({
  form: 'signin',
  fields: ['email', 'password']
})(connect(
  mapStateToProps, actions)(SigninForm)
);
