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
            <Input icon='search' onBlur={this.props.onSearchStop} placeholder='Search...' loading={this.props.searchLoading} onChange={this.props.onSearch} />
         </Menu.Item>

         <Menu.Item position="right">
           <Button icon="trash outline" onClick={this.props.removeAll} circular negative content="Remove all"/>
         </Menu.Item>
        </Menu>
      )
  }
}

export default MenuBar;