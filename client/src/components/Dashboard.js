import React from "react"; 
import { Dropdown, Icon, Menu, Segment } from 'semantic-ui-react';
import Wizard from '../containers/Wizard';

const Dashboard = ({user, onCredentials, wizard}) => {
  if (user) {
    console.log(user, wizard);
  }
  if (!user) {
    return <div style={{textAlign: 'center'}}>Please login</div>;
  }
  return (
    <div style={{textAlign: 'center'}}>
    <h2>Welcome to your Dashboard</h2>
    <Wizard />
    </div>
  );
}

export default Dashboard;