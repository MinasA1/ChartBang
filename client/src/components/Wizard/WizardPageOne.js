import React, {Component} from 'react'
import {Field, reduxForm} from 'redux-form'
import {Grid, Container, Segment, Button, Form, Checkbox } from 'semantic-ui-react'
import validate from './validate'
import renderField from './renderField'
import renderSelector from './renderSelector'

const dbTypes = ['mysql', 'postgres']

const renderCheckbox = ({ input, label}) => (
  <div>
  <Checkbox label={label}
    checked={input.checked}
    onChange={() => input.onChange(!input.value)}
    />
  <div>{input.value}</div>
  </div>
)

const WizardFormFirstPage = props => {

  const { handleSubmit, checked, dbs, conn, readDB, setPage} = props;
  let conns = []
  for (let i of dbs) {
    conns.push(i.name)
  }
  const myHandleSubmit = () => {
    if (conn) {
    readDB(conn)
    setPage(3)
    } else {
    handleSubmit()
    }

  }
  return (
    <Segment style={{
      display: 'flex',
      justifyContent: 'center',
      textAlign: 'center'}}>
      <Form onSubmit={handleSubmit}    >
      <h4>Choose Connection:</h4>
        
       {checked ?
       <Form.Field>
       <Grid centered columns={2}>
         <Field
          name="name"
          type="text"
          component={renderField}
          label='Connection Name'
          placeholder="Connection Name"
          size='medium'
         />
        <Field
          name="dbType"
          values={dbTypes}
          label='Database Type'
          component={renderSelector}
        /> 
      </Grid>
      <br />
      </Form.Field> :
      <Field
      name='conn'
      label='Connections'
      component={renderSelector}
      values={conns}
      />
       }
        <br />       
       <Grid centered columns={2}>
        <Field
        name='checked'
        label='New Connection'
        component={renderCheckbox}
        />
        <Form.Field>
        <Button type="submit" >Next</Button>
        </Form.Field>
        </Grid>
        <br />

      </Form>
    </Segment>  
  );
};


export default reduxForm({
  form: 'wizard', // <------ same form name
  destroyOnUnmount: false, // <------ preserve form data
  forceUnregisterOnUnmount: true, // <------ unregister fields on unmount
  validate
})(WizardFormFirstPage)