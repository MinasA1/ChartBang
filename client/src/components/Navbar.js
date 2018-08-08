import React from 'react';
import {Link} from 'react-router-dom';
import {Icon, Menu} from 'semantic-ui-react';
import ModalWizard from './modal';

const Navbar = props => {
  const {user, onLogout, toggleSidebar, location} = props;
  return (
    <Menu fluid inverted attached='top' size='massive'>
      
      
      <Menu.Item  as={Link} to='/'>
        <Icon name='home' />
       </Menu.Item>
       {user && location.pathname === '/Dashboard' &&
        <Menu.Item onClick={toggleSidebar}>
          <Icon name='sidebar' />
        </Menu.Item>
      }
       {user  &&
        <Icon name='magic' as={ModalWizard}/>
       }
      <Menu.Menu position='right'>
        {user ?
          <Menu.Item as={Link} to='/Dashboard'><Icon name='television'/></Menu.Item>
          :
          <Menu.Item as={Link} to='/signup'><Icon name='signup' /></Menu.Item>}
        {user ?
          <Menu.Item as={Link} to='/' onClick={onLogout}><Icon name='sign out' /></Menu.Item>
          :
          <Menu.Item as={Link} to='/signin'><Icon name='sign in' /></Menu.Item>
        }
      </Menu.Menu>
    </Menu>
  );
}


export default Navbar