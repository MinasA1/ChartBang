import React from "react"; 
import { Dropdown, Icon, Menu, Segment } from 'semantic-ui-react';
import WizardForm from './WizardR/Wizard';

const Dashboard = ({user, onCredentials}) => {
  if (!user) {
    return <div style={{textAlign: 'center'}}>Please login</div>;
  }
  return (
    <div style={{textAlign: 'center'}}>
    <h2>Welcome to your Dashboard</h2>
    <WizardForm 
      onCredentials={onCredentials}
    />
    </div>
  );
}

export default Dashboard;