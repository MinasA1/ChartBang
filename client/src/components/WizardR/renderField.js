import React from 'react'
import {Input} from 'semantic-ui-react'

const renderField = ({ input, label, placeholder, type, meta: { touched, error } }) => (
  <div>
    <label>{label}</label>  
    <div>
      <Input {...input} placeholder={placeholder} type={type} />
      {touched && error && <span>{error}</span>}
    </div>
  </div>
)

export default renderField