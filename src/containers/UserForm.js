import React, {Component} from 'react';
import {Field, reduxForm} from "redux-form";
import {connect} from 'react-redux';
import {createItem} from '../actions/';
import '../index.css';

class UserForm extends Component{

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

  renderTextArea(field){
    //const {meta : { touched, error}} = field;  //destructuring and assigning
    const fieldClassName = `form-group ${field.meta.touched && field.meta.error ? 'has-danger' : ''}`
    return(
      <div className={fieldClassName}>
        <label>{field.label}</label>
        <textarea className="form-control"
          type="text" rows="2"
          {...field.input}
        ></textarea>
        <div className="text-help">
          {field.meta.touched ? field.meta.error : ""}
        </div>
      </div>
    )
  }

  onSubmit(values){
    //console.log(this.props.history.location.pathname);
    console.log("...form submitted", values);
    this.props.createItem(values, ()=>{
      this.props.reset();
      //this.props.history.push('/');

    });
  }

  render(){
    const {handleSubmit} = this.props;
    return(
      <div className="userForm">
        <form className="form" onSubmit={handleSubmit(this.onSubmit.bind(this))}>
          <div>
          <Field
            className="usernamefield"
            label="Name"
            name="name"
            component={this.renderField}
          />
          <Field
            label="Email"
            name="email"
            component={this.renderField}
          />
          <Field
            label="Rating"
            name="rating"
            component={this.renderField}
          />
          <Field
            label="Comment"
            name="comment"
            component={this.renderTextArea}
          />
          <button type="submit" className="btn apply_medium">Submit</button>
        </div>
        </form>
      </div>
    )
  }
}

function validate(values){
  const errors = {};
  if(!values.name){
    errors.name="Enter your name";
  }
  if(!values.email){
    errors.email="Enter your email address";
  }

  return errors;
}

function mapStatetoProps(state){
  return {applyFormSubmitted : state.applyFormSubmitted}
}

export default reduxForm({
  validate,
  form:"NewCommentForm"
})(
  connect(mapStatetoProps, {createItem})(UserForm)
);
