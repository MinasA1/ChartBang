import React, {Component} from 'react'
import {Field, reduxForm} from 'redux-form'
import {Form, Button, Label} from 'semantic-ui-react'
import validate from './validate'
import renderField from './renderField'
import renderSelector from './renderSelector'
import Container from 'semantic-ui-react/dist/commonjs/elements/Container/Container';

const renderError = ({meta: {touched, error}}) =>
  touched && error ? <span>{error}</span> : false

class WizardFormSecondPage extends Component {
  constructor(props) {
    super(props);
    this.myHandleSubmit = this.myHandleSubmit.bind(this)
  }
  myHandleSubmit(){
    this.props.handleSubmit()
    this.props.nextPage()
  }
  render () {
  const {pristine, previousPage, submitting} = this.props

return (
    <Form onSubmit={this.myHandleSubmit}>
      <Field name="dbHost" type="text" component={renderField} placeholder='Database Host' />
      <div>
      <Field name="dbName" type="text" component={renderField} placeholder='Database Name' />      
      </div>
      <Field name="dbUser" type="text" component={renderField} placeholder='Databse User' />
      <Label>{this.props.dbType}</Label>     
      <Field name="dbPass" type="password" component={renderField} placeholder='User Password' />      
      <div>
        <Button type="button" className="previous" onClick={previousPage}>
          Previous
        </Button>
        <Button type="submit" disabled={pristine || submitting}>Submit</Button>
      </div>
    </Form>
    )
  }
}

export default reduxForm({
  form: 'wizard', //Form name is same
  destroyOnUnmount: false,
  forceUnregisterOnUnmount: true, // <------ unregister fields on unmount
  validate
})(WizardFormSecondPage)