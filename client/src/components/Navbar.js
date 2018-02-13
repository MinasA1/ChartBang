import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import { Dropdown, Icon, Menu, Segment, Button } from 'semantic-ui-react';
import ModalScrollingExample from './modal'

const Navbar = props => {
  const {user, onLogout} = props;
  return (
    <Menu fluid inverted size='huge'>
      <Menu.Item  as={Link} to='/'>
        <Icon name='home' />
      </Menu.Item>
      {user ?
      <div>
        <Dropdown item icon='sidebar' simple>
          <Dropdown.Menu>
            <Dropdown.Item>
              <Icon name='dropdown' />
              <span className='text'>New</span>
              <Dropdown.Menu>
                <Dropdown.Item>Database</Dropdown.Item>
                <Dropdown.Item>Chart</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown.Item>
            <Dropdown.Item>Databases</Dropdown.Item>
            <Dropdown.Item>Charts</Dropdown.Item>
            <Dropdown.Item>Import</Dropdown.Item>
            <Dropdown.Divider />
            <Dropdown.Header>Export</Dropdown.Header>
            <Dropdown.Item>Save as Pdf</Dropdown.Item>
            <Dropdown.Item>Share</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </div>
        :
        <div />
      }
      
      <Menu.Menu position='right'>
        {user ?
          <Menu.Item as={Link} to='/Dashboard'><Icon name='computer'/></Menu.Item>
          :
          <Menu.Item as={Link} to='/signup'>Sign Up</Menu.Item>}
        {user ?
          <Menu.Item as={Link} to='/signin' onClick={onLogout}>Logout</Menu.Item>
          :
          <Menu.Item as={Link} to='/signin'>Log in</Menu.Item>
        }
      </Menu.Menu>
    </Menu>
  );
}


export default Navbar