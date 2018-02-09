import React from 'react';
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
    <p>Lorem Ipsum</p>    
    </Segment>
    </Container>
    </div>
  );
}

export default Homepage;
