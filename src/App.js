import React, { Component } from 'react';
import {Grid, Divider} from 'semantic-ui-react'
import './App.css';

import ShortcutEntry from './myModules/ShortcutEntry';
import MenuBar from './myModules/MenuBar';
import ShortcutList from './myModules/ShortcutList';

const {ipcRenderer} = window.require('electron');

class App extends Component {
  constructor(){
    super();

    this.state = {
      is_shortcutEntry_open: true,
      shortcutEntry_default_key: null,
      shortcutEntry_default_data: null,
      shortcutEntry_key_error: null,
      shortcutEntry_data_error: null,
      
      shortcut_list: Array(3).fill(null),
      
    }
  }

  render() {    
    return (
      <Grid>
        <Grid.Row>
          <Grid.Column>
            
            <MenuBar addNew={this.openShortcutEntry} removeAll={this.removeAllShortcuts} />

            <ShortcutEntry 
                  defaultShortcutKey={this.state.shortcutEntry_default_key} 
                  defaultShortcutData={this.state.shortcutEntry_default_data}
                  onKeyError={this.state.shortcutEntry_key_error}
                  onDataError={this.state.shortcutEntry_data_error} 
                  saveShortcut={this.saveShortcut} 
                  open={this.state.is_shortcutEntry_open} 
                  onClose={this.closeShortcutEntry} 
            />

            <Divider hidden section />
            
            <ShortcutList list={this.state.shortcut_list} removeShortcut={this.removeShortcut} />
  
          </Grid.Column>
        </Grid.Row>
      </Grid>
    );
  }


  // Helper Functions

  openShortcutEntry = () => this.setState({is_shortcutEntry_open: true });

  closeShortcutEntry = () =>{
    this.setState({is_shortcutEntry_open: false});
  }

  removeAllShortcuts = () => {
    confirm("Really Bro?");
  }

  removeShortcut = (id) =>{
    console.log(`Shortcut with id: ${id} asks to be removed...`);
  }

  saveShortcut = (shortcut, data) =>{ 
    console.log(`Data to be saved: shortcut:${shortcut} | Data:${data}`);

    // check if shortcut or data is not empty
    if(shortcut === "" || shortcut === null) this.setState({shortcutEntry_key_error: 'Shortcut cannot be empty..'});

    if(data === "" || data === null) return this.setState({shortcutEntry_data_error: 'Data cannot be empty..'});
    else this.setState({shortcutEntry_data_error: null});


    // Register shortcut
    const register_shortcut = ipcRenderer.sendSync('register_shortcut', shortcut, data);

    if(!register_shortcut.success){
      this.setState({shortcutEntry_key_error: register_shortcut.msg});
      return;

    }else{
      // on success let's close and clean stuff up
      console.log("success");
      this.closeShortcutEntry();
    }


    console.log('Result: ', register_shortcut);

  }

}

export default App;
