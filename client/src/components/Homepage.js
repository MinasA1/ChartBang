import React, {Component} from 'react';
//import Dashboard from './Dashboard';
import {Segment, Grid } from 'semantic-ui-react';
import ChartItem from '../components/Charts/ChartsHome'

class Homepage extends Component {
  constructor(props) {
    super(props)
    this.state = { isOpen: false }
  }
  
  render () {
  return (
    <Segment padded='very' >
      <Grid> 
      <Grid.Row centered textAlign='center'>
       <Segment>
      <h3>Welcome to ChartBang, the most simple and fastest data visualizer!</h3>
      </Segment>
      </Grid.Row>  
      <Grid.Row textAlign='justified'>
      <Grid.Column>
        <p>
          Justified content fits exactly inside the grid column, taking up the entire width from one side to the
          other. Justified content fits exactly inside the grid column, taking up the entire width from one side to
          the other. Justified content fits exactly inside the grid column, taking up the entire width from one side
          to the other. Justified content fits exactly inside the grid column, taking up the entire width from one
          side to the other. Justified content fits exactly inside the grid column, taking up the entire width from
          one side to the other.
        </p>
      </Grid.Column>
    </Grid.Row>
    <Grid.Row>
      <ChartItem />      
    </Grid.Row>
      </Grid>    
    </Segment>
    )}
}

export default Homepage;
