import React from 'react';
import {Form, Select} from 'semantic-ui-react'

const renderSelector = ({ input, values, label, meta: { touched, error } }) => (
  <div>
    <label>{label}</label>
    <select {...input} control='select'>
      <option value="">Select</option>
      {values.map(val => <option value={val} key={val}>{val}</option>)}
    </select>
    {touched && error && <span>{error}</span>}
  </div>
);
export default renderSelector;