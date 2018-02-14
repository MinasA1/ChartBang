import React from "react";
import Container, { Dropdown, Icon, Menu, Segment, Sidebar, Header, Button } from 'semantic-ui-react';
import Wizard from '../containers/Wizard';
import ChartLine from './ChartCanvas'

class Dashboard extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      visible: false
    }
  }
  toggleVisibility = () => this.setState({ 'visible': !this.state.visible })
  
  render() {
    const {user, visible, toggleSidebar} = this.props
    if(user) {
      console.log(user);
    }
    if(!user) {
      return <div style={{ textAlign: 'center' }}>Please login</div>;
    }
    return (
        <div>
        <Sidebar.Pushable >
          <Sidebar as={Menu} animation='push' width='thin' visible={visible} icon='labeled' inverted vertical>
            <Menu.Item name='databases'>
              <Icon name='database' />
              Databases
            </Menu.Item>
            <Menu.Item name='charts'>
              <Icon name='line chart' />
              Charts
            </Menu.Item>
            <Menu.Item>
            Channels
              <Icon name='envelope' />
            </Menu.Item>
          </Sidebar>
          <Sidebar.Pusher>
            <Segment basic>
              <Header as='h3'>Application Content</Header>
              <ChartLine />
            </Segment>
          </Sidebar.Pusher>
        </Sidebar.Pushable>
        </div>

    );
  }
}
export default Dashboard;