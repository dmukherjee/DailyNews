import React from 'react';
import { Menu, Segment, Input, Button } from 'semantic-ui-react';

const selectOptions = ['Top Stories', 'Most Viewed'];

const Navbar = () => (
  <Menu pointing fixed='top' style={{height: 110, backgroundColor: '#f1f1f1'}}>
      <div className='heading'>News Desk</div>
      <Menu.Menu position='right'>
        {/* <Menu.Item>
          <Input icon={{ name: 'search', link: true }} placeholder='Search by category' />
        </Menu.Item> */}
      </Menu.Menu>
  </Menu>
)

module.exports = Navbar;