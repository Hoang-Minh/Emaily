// SurveyForm shows a form for a user to add input
import React, { Component } from "react";
import { reduxForm, Field } from "redux-form";
import { Link } from "react-router-dom";
import SurveyField from "./SurveyField";
import validateEmails from "../../util/validateEmails";
import formFields from "./formFields";

class SurveyForm extends Component {
  renderFields() {
    return formFields.map(({ label, name }) => (
      <Field
        key={label}
        label={label}
        name={name}
        type="text"
        component={SurveyField}
      ></Field>
    ));
  }
  render() {
    return (
      <form onSubmit={this.props.handleSubmit(this.props.onSurveySubmit)}>
        {this.renderFields()}

        <Link to="/surveys" className="red btn waves-effect waves-light left">
          Cancel
        </Link>

        <button
          className="btn waves-effect waves-light right"
          type="submit"
          name="action"
        >
          Next
          <i className="material-icons right">navigate_next</i>
        </button>
      </form>
    );
  }
}

const validate = (formValues) => {
  const error = {};

  error.recipients = validateEmails(formValues.recipients || "");

  formFields.forEach(({ name }) => {
    if (!formValues[name]) {
      error[name] = `You must provide a ${name}`;
    }
  });

  return error;
};

export default reduxForm({
  form: "surveyForm",
  validate: validate, // or can condensed it down to validate,
  destroyOnUnmount: false,
})(SurveyForm);
