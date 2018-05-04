import React from 'react'
import { Input, Label, Menu } from 'semantic-ui-react'

const Navbar = () => (
  <Menu fixed='top' style={{height: 110}}>
      <Menu.Item
        name='editorials'>
        Editorials
      </Menu.Item>
      <Menu.Item
        name='reviews'>
        Reviews
      </Menu.Item>
  </Menu>
)

module.exports = Navbar;