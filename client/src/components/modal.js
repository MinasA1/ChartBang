import React from 'react'
import { Button, Header, Icon, Image, Modal, Menu } from 'semantic-ui-react'
import Wizard from '../containers/Wizard'

const ModalWizard = () => (
  <Modal 
  closeIcon
  trigger={<Menu.Item><Icon name='magic' /></Menu.Item>}
  closeOnDimmerClick={false}
  style={{width:800, height:400}}
  >
    <Wizard />
  </Modal>
)

export default ModalWizard