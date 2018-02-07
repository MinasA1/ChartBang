import React, {Component}from 'react'
import {Field, reduxForm} from 'redux-form'
import {Form} from 'semantic-ui-react'
import validate from './validate'
import renderSelector from './renderSelector'


class WizardFormThirdPage extends Component {
  constructor(props) {
    super(props)
  }
  componentDidMount(){
    const schema = localStorage.getItem('schema')
  }
  render () {
   const {handleSubmit, pristine, previousPage, submitting} = this.props

  return (
    <Form onSubmit={handleSubmit}>
      <div>
    
      
      </div>
      <div>
        <label>Notes</label>
        <div>
          <Field name="notes" component="textarea" placeholder="Notes" />
        </div>
      </div>
      <div>
        <button type="button" className="previous" onClick={previousPage}>
          Previous
        </button>
        <button type="submit" disabled={pristine || submitting}>Submit</button>
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
})(WizardFormThirdPage)