// SurveyField contains logic to render a single lable and text input
import React from "react";

export default ({ input, label, meta: { error, touched } }) => {
  return (
    // {...input} will be equal to onBlur={input.OnBlur} onChange={input.onChange}....
    // {touched && error} == {touched && error ? error : null}
    <div>
      <label>{label}</label>
      <input {...input} autoComplete="off"></input>
      <div className="red-text" style={{ marginBottom: "20px" }}>
        {touched && error}
      </div>
    </div>
  );
};
