import React from 'react'
import {Container, Icon, Image, Segment, Step } from 'semantic-ui-react'

const WizardSteps = (props) => (
    <Segment >
    <Step.Group >
    <Step
    disabled={props.page !== 1}
    active={props.page === 1}>
      <Icon name='server' />
      <Step.Content>
        <Step.Title>Connection</Step.Title>
        <Step.Description>Choose your Connection</Step.Description>
      </Step.Content>
    </Step>
    <Step 
    disabled={props.page !== 2}
    active={props.page === 2}>
      <Icon name='database' />
      <Step.Content>
        <Step.Title>Database</Step.Title>
        <Step.Description>Choose your Data</Step.Description>
      </Step.Content>
    </Step>
    <Step 
    disabled={props.page !== 3}
    active={props.page === 3}>
      <Icon name='line chart' />
      <Step.Content>
        <Step.Title>Visualize</Step.Title>
        <Step.Description>Pick a chart</Step.Description>
      </Step.Content>
    </Step>
  </Step.Group>
  </Segment>
)

export default WizardSteps