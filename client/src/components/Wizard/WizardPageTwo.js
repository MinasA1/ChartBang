import React, {Component} from 'react'
import {Field, reduxForm} from 'redux-form'
import {Form, Button, Label} from 'semantic-ui-react'
import validate from './validate'
import renderField from './renderField'
import renderSelector from './renderSelector'
import Container from 'semantic-ui-react/dist/commonjs/elements/Container/Container';
import Divider from 'semantic-ui-react/dist/commonjs/elements/Divider/Divider';

const renderError = ({meta: {touched, error}}) =>
  touched && error ? <span>{error}</span> : false

class WizardFormSecondPage extends Component {
  constructor(props) {
    super(props);
    this.myHandleSubmit = this.myHandleSubmit.bind(this)
    this.logWiz = this.logWiz.bind(this)
    this.state = {
    items: [],
    }
  }
  compononetDidMount() {
   console.log('HERE I MOUNT')
  }
  logWiz() {
    console.log(this.props.wizard.values);
  }
  myHandleSubmit(){
    this.props.handleSubmit()
    this.props.nextPage()
  }
  render () {
  const {pristine, previousPage, submitting, wizard} = this.props
return (
  <Container style={{display: 'flex', justifyContent: 'center', textAlign: 'center'}}>
    <Form onSubmit={this.myHandleSubmit}>
        <Field name="dbHost" type="text" component={renderField} placeholder='Database Host' />
        <br />
        <Field name="dbName" type="text" component={renderField} placeholder='Database Name' />
        <br />
        <Field name="dbUser" type="text" component={renderField} placeholder='Databse User' />    
        <br />
        <Field name="dbPass" type="password" component={renderField} placeholder='User Password' />      
        <br />
        {wizard.values.dbType === 'postgres' ? 
        <Field name="dbSchema" type='text' defValue='public' component={renderField} placeholder='Schema Name' />
          : <div></div>}
        <div>
        <Button type="button" className="previous" onClick={previousPage}>
          Previous
        </Button>
        <Divider />
        <Button type='button' onClick={this.logWiz}>log</Button>
        <Button type="submit" disabled={pristine || submitting}>Submit</Button>
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