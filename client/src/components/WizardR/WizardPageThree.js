import React, {Component}from 'react'
import {Field, reduxForm} from 'redux-form'
import validate from './validate'
import renderSelector from './renderSelector'
const dbTypes = ['Mysql', 'Postgres']

class WizardFormThirdPage extends Component {
  constructor(props) {
    super(props)
  }
  componentDidMount(){
    const schema = localStorage.getItem('schema')
  }
  render () {
   const {handleSubmit, pristine, previousPage, submitting} = props

  return (
    <Form onSubmit={handleSubmit}>
      <div>
        <label>Favorite Color</label>
        <Field name="" component={renderSelector} values={}/>
      </div>
      
          />
        </div>
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