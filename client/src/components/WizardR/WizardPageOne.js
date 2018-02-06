import React from 'react'
import {Field, reduxForm} from 'redux-form'
import {Container, Segment, Button, Form} from 'semantic-ui-react'
import validate from './validate'
import renderField from './renderField'
import renderSelector from './renderSelector'
const dbTypes = ['mysql', 'postgres']

const WizardFormFirstPage = props => {
  const { handleSubmit } = props;
  return (
    <Container style={{display: 'flex', justifyContent: 'center', textAlign: 'center'}}>
      <Form onSubmit={handleSubmit}>
        <Field
          name="name"
          type="text"
          component={renderField}
          label='Connection Name'
          placeholder="Connection Name"
        />
        <Field
          name="dbType"
          values={dbTypes}
          label='Database Type'
          component={renderSelector}
        />
        <div>
          <Button type="submit" className="next">Next</Button>
        </div>
      </Form>
    </Container>
  );
};


export default reduxForm({
  form: 'wizard', // <------ same form name
  destroyOnUnmount: false, // <------ preserve form data
  forceUnregisterOnUnmount: true, // <------ unregister fields on unmount
  validate
})(WizardFormFirstPage)