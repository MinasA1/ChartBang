import React from 'react';
import Wizard from './Wizard/Wizard'
import Dashboard from './Dashboard';
import {Container, Segment} from 'semantic-ui-react';

const Homepage = () => {
  const homeStyles = {
    display: 'flex', 
    width: '100%',
    justifyContent: 'center' 
  }
  return (
    <div style={homeStyles}>
    <Container>
    <Segment> 
      <h3 style={{textAlign: 'center'}}>Welcome to ChartBang, most simple and fast, data visualizer!</h3>      
    </Segment>
    <Segment>
    <p>ChartBang is thedas safas sdfsdf wqewq  fsad</p>    
    </Segment>
    </Container>
    </div>
  );
}

export default Homepage;
