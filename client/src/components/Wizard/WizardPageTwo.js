import React, {Component} from 'react'
import {Field, reduxForm} from 'redux-form'
import {Form, Button, Label, Container} from 'semantic-ui-react'
import validate from './validate'
import renderField from './renderField'
import renderSelector from './renderSelector'

const renderError = ({meta: {touched, error}}) =>
  touched && error ? <span>{error}</span> : false

class WizardFormSecondPage extends Component {
  constructor(props) {
    super(props);
    this.myHandleSubmit = this.myHandleSubmit.bind(this)
    this.state = {
    items: [],
    }
  }
  compononetDidMount() {
   console.log('HERE I MOUNT')
  }
  myHandleSubmit(){
    this.props.handleSubmit()
    this.props.nextPage()
  }
  render () {
  const {pristine, prevPage, submitting, dbType} = this.props
return (
  <Container style={{display: 'flex', justifyContent: 'center', textAlign: 'center'}}>
    <Form onSubmit={this.myHandleSubmit}>
        <Field name="dbHost" type="text" component={renderField} placeholder='Database Host' />
        <Field name="dbName" type="text" component={renderField} placeholder='Database Name' />
        <Field name="dbUser" type="text" component={renderField} placeholder='Databse User' />    
        <Field name="dbPass" type="password" component={renderField} placeholder='User Password' />
        {dbType === 'postgres' && 
        <Field name="dbSchema" type='text' defValue='public' component={renderField} placeholder='Schema Name' />}
        <div>
        <Button type="button" className="previous" onClick={prevPage}>
          Previous
        </Button>
        <Button type="submit" disabled={pristine || submitting}>Next</Button>
        </div>
    </Form>
    <div>
      { this.state.items.map((item) => <p> {item.title} </p> )}
    </div>
  </Container>
    )
  }
}

export default reduxForm({
  form: 'wizard', //Form name is same
  destroyOnUnmount: false,
  forceUnregisterOnUnmount: true, // <------ unregister fields on unmount
  validate
})(WizardFormSecondPage)