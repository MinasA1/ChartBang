import React from 'react'
import {Form, Input} from 'semantic-ui-react'

const renderField = ({ input, label, placeholder,size, type, meta: { touched, error } }) => (
  <Form.Field>
    <label>{label}</label>  
    <div>
      <Input {...input} placeholder={placeholder} type={type} size={size} />
      {touched && error && <span>{error}</span>}
    </div>
  </Form.Field>
)

export default renderField