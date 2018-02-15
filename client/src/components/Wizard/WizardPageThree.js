import React, { Component } from 'react'
import { Field, FieldArray, reduxForm } from 'redux-form'
import { Menu, Accordion, List, Grid, Form, Button, Label, Segment, Container } from 'semantic-ui-react'
import validate from './validate'
import renderField from './renderField'
import renderSelector from './renderSelector'
import { loadSchema } from '../../reducers'
import Dropdown from 'react-dropdown'
import 'react-dropdown/style.css'
import { ChromePicker } from 'react-color'

class renderDropDown extends Component {
  constructor(props) {
    super(props)
  }
  render() {
    const { values, meta: { touched, error, submitFailed }, input } = this.props

    return (
      <div>
        <select {...input} >
          <option value="">Select</option>

          {values.map((value, index) =>
            <option value={value.name} key={index}>value.name</option>
          )}
        </select>
        {touched && error && <span>{error}</span>}
      </div>
    )
  }
}
const renderHobbies = ({ fields, meta: { error } }) => (
  <ul>
    <li>
      <button type="button" onClick={() => fields.push()}>Add Hobby</button>
    </li>
    {fields.map((hobby, index) =>
      <li key={index}>
        <Button
          type="button"
          title="Remove Hobby"
          onClick={() => fields.remove(index)} />
        <Field
          name={hobby}
          type="text"
          component={renderField}
          label={`Hobby #${index + 1}`} />
      </li>
    )}
    {error && <li className="error">{error}</li>}
  </ul>
)

const renderDataset = ({ fields, data, datasets, columns, tables,
  meta: { touched, error, submitFailed } }) => (
    <List>
      <List.Item>
        <Button type="button" onClick={() => fields.push({ active: 'test' })}>Add Dataset</Button>
        {(touched || submitFailed) && error && <span>{error}</span>}
      </List.Item>
      {fields.map((value, index) =>
        <List.Item key={index}>
          <Button
            onClick={() => fields.remove(index)}>Remove Dataset</Button>
          <h4>Dataset #{index + 1}</h4>
          <Field
            name={`${value}.labelsTable`}
            type="text"
            values={tables}
            component={renderSelector}
            label="Pick Table for Data Labels" />
          <Field
            name={`${value}.labelsField`}
            type="text"
            values={columns[datasets[index]['labelsTable']] || []}
            component={renderSelector}
            label="Pick Field for Data Labels" />
          <Field
            name={`${value}.color`}
            component={renderSelector}
            values={['red', 'blue', 'green', 'yellow']}
            label='ColorPicker'
          />
        </List.Item>
      )}
    </List>
  )

class WizardFormThirdPage extends Component {
  constructor(props) {
    super(props)
    this.tables = this.tables.bind(this)
    this.columns = this.columns.bind(this)
    this.renderer = this.renderer.bind(this)
    this.state = {
      activeIndex: 0
    }
  }
  componentDidMount() {
  }

  toggleIndex = (e, titleProps) => {
    const { index } = titleProps
    const { activeIndex } = this.state
    const newIndex = activeIndex === index ? -1 : index
    this.setState({ activeIndex: newIndex })
  }
  prevPage = () => {
    if (!this.props.checked) {
      //      readDB(conn)
      this.props.setPage(1)
    } else {
      this.props.prevPage()
    }
  }
  renderer() {
    let rows = []

    for (let i in this.props.schema) {
      let group = {}
      group['type'] = 'group'
      group['name'] = i
      group['items'] = []
      for (let j of this.props.schema[i]) {
        let item = {}
        item['value'] = j
        item['label'] = j
        group['items'].push(item)
      }
      rows.push(group)
    }

    return rows
  }
  MyLog(a, b) {
    console.log(a, 'A', b, 'B')
  }
  tables() {
    let tb = []
    for (let i in this.props.schema)
      tb.push(i)
    return tb
  }
  columns() {
    let tb = {}
    for (let i in this.props.schema) {
      tb[i] = []
      for (let j of this.props.schema[i])
        tb[i].push(j)
    }
    return tb
  }

  render() {
    const { handleSubmit, pristine, reset, submitting, datasets, xTable } = this.props
    const options = this.renderer()
    const tables = this.tables()
    const columns = this.columns()
    const { activeIndex } = this.state
    return (
      <Container  >
        <Grid centered>
          <Grid.Row columns={2}>
            <Grid.Column>

              <Accordion as={Menu} vertical>
                <Menu.Item>
                  <Accordion.Title
                    active={activeIndex === 0}
                    content='Chart Info'
                    index={0}
                    onClick={this.toggleIndex}
                  />
                  <Accordion.Content active={activeIndex === 0}>
                    <Form>
                      <Field
                        name='chartType'
                        values={['Pie', 'Line', 'Bar']}
                        label='Chart Type'
                        component={renderSelector}
                      />
                      <Field
                        name='chartName'
                        label='Chart Name'
                        component={renderField}
                        placeholder='MyChart'
                      />
                    </Form>
                  </Accordion.Content>
                </Menu.Item>
                <Menu.Item>
                  <Accordion.Title
                    active={activeIndex === 1}
                    content='xAxis'
                    index={1}
                    onClick={this.toggleIndex}
                  />
                  <Accordion.Content active={activeIndex === 1}>
                    <Form>
                      <Field
                        name='xTable'
                        type="text"
                        values={tables}
                        component={renderSelector}
                        label="Pick Table for x Axis" />
                      <Field
                        name='xField'
                        type="text"
                        values={xTable ? columns[xTable] : []}
                        component={renderSelector}
                        label="Pick Field for x Axis" />
                    </Form>
                  </Accordion.Content>
                </Menu.Item>
                <Menu.Item>
                  <Accordion.Title
                    active={activeIndex === 2}
                    content='yAxis'
                    index={2}
                    onClick={this.toggleIndex}
                  />
                  <Accordion.Content active={activeIndex === 2}>
                    <Form>
                      <FieldArray name='datasets' component={renderDataset}
                        props={{ data: options, datasets: datasets, tables: tables, columns: columns }}
                      />
                    </Form>
                  </Accordion.Content>
                </Menu.Item>
              </Accordion>
            </Grid.Column>
            <Grid.Column>
              <Button type="button" disabled={pristine || submitting} onClick={reset}>Clear Values</Button>
              <Button type="button" className="previous" onClick={this.prevPage}>
                Previous</Button>


              <Button onClick={this.MyLog(columns, xTable)}>log schema</Button>
            </Grid.Column>
          </Grid.Row>
          <Grid.Column>
            <Button type="submit" disabled={pristine || submitting}onClick={handleSubmit}>Submit</Button>
            </Grid.Column>


        </Grid>
      </Container >
    )
  }
}
export default reduxForm({
  form: 'wizard', //Form name is same
  destroyOnUnmount: false,
  forceUnregisterOnUnmount: true, // <------ unregister fields on unmount
  validate
})(WizardFormThirdPage)
                  /*
            <Form.Field>
          <Dropdown options={options} placeholder='Select a column' />
        </Form.Field>
        <Dropdown options={options} placeholder='Select a column' /> */