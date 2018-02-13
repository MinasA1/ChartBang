import React from 'react';
import {Form, Select} from 'semantic-ui-react'

const renderSelector = ({ input, values, label, meta: { touched, error }, disabled}) => (
  <Form.Field disabled={disabled}>
    <label>{label}</label>
    <select {...input} >
      <option value="">Select</option>
      {values.map(val => <option value={val} key={val}>{val}</option>)}
    </select>
    {touched && error && <span>{error}</span>}
  </Form.Field >
);
export default renderSelector;