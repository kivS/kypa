import React, { Component } from 'react';
import { Menu, Button, Input} from 'semantic-ui-react'

class MenuBar extends Component{
  render(){
    return(
        <Menu fixed="top" inverted borderless widths="3">
         <Menu.Item>
           <Button icon="add" onClick={this.props.addNew} primary circular content="Add new"/>
         </Menu.Item>

         <Menu.Item>
            <Input icon='search' placeholder='Search...' loading={false} />
         </Menu.Item>

         <Menu.Item position="right">
           <Button icon="trash outline" onClick={this.props.removeAll} circular negative content="Remove all"/>
         </Menu.Item>
        </Menu>
      )
  }
}

export default MenuBar;