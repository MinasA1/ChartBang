import React from 'react'
import {Header, Icon,Modal, Menu } from 'semantic-ui-react'
import Wizard from '../containers/Wizard'

const ModalWizard = () => (
  <Modal 
  closeIcon
  trigger={<Menu.Item><Icon name='magic' /></Menu.Item>}
  closeOnDimmerClick={false}
  style={{width:800, height:400}}
  >
  <Modal.Content scrolling>
    <Modal.Description>
        <Header></Header>
      </Modal.Description>
      <Wizard />      
  </Modal.Content>    
  </Modal>
)

export default ModalWizard