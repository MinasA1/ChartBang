import React, {Component}from 'react'
import {Field, reduxForm} from 'redux-form'
import {Form, Button, Label, Segment, Container} from 'semantic-ui-react'
import validate from './validate'
import renderSelector from './renderSelector'
import {loadSchema} from '../../reducers'
import Dropdown from 'react-dropdown'
import 'react-dropdown/style.css'

class WizardFormThirdPage extends Component {
  constructor(props) {
    super(props)
    this.logwiz = this.logwiz.bind(this)
    this.renderer = this.renderer.bind(this)  
    this.state ={
      schema: JSON.parse(localStorage.getItem('schema'))
    }
  }
  componentDidMount(){
    //Object.entries(loadSchema())
    //const schema = localStorage.getItem('schema')
  }

  logwiz(){
   for (let i in this.state.schema) {
        console.log(i)
        for (let j of this.state.schema[i]) {
          console.log(j)
        }
      }
   }
  renderer() {
    let rows = []
    
    for (let i in this.state.schema) {
      let group = {}
      group['type'] = 'group'
      group['name'] = i
      group['items'] = []
      for (let j of this.state.schema[i]){
        let item = {}
        item['value'] = j
        item['label'] = j
        group['items'].push(item)
      }
      rows.push(group)
    }
   
    return rows
  }

  render () {
    const {handleSubmit, pristine, previousPage, submitting} = this.props
    const options = this.renderer()
  return (
    
    <Container  style={{display: 'flex', justifyContent: 'center', textAlign: 'center'}}> 
    <Segment>
    <Form onSubmit={handleSubmit}>
      <div>
        
        <Dropdown options={options} placeholder='Select a column' />
      
      
        <Dropdown options={options} placeholder='Select a column' />
      
      </div>
      <div>
        <Button type="button" className="previous" onClick={previousPage}>
          Previous
        </Button>
        <Button onClick={this.logwiz}>log schema</Button>
        <Button type="submit" disabled={pristine || submitting}>Submit</Button>
      </div>
    </Form>
    </Segment>
    </Container>
  )
}
}
export default reduxForm({
  form: 'wizard', //Form name is same
  destroyOnUnmount: false,
  forceUnregisterOnUnmount: true, // <------ unregister fields on unmount
  validate
})(WizardFormThirdPage)