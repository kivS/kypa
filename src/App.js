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
      is_shortcutEntry_open: false,
      shortcutEntry_default_key: null,
      shortcutEntry_default_data: null,
      shortcutEntry_key_value: null,
      shortcutEntry_data_value: null,
      shortcutEntry_key_error: null,
      shortcutEntry_data_error: null,
      
      shortcut_list: null
      
    }
  }

  componentWillMount(){

    // load shortcut list data
    this.getShortcuts();
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
                  onShortcutKeyChange={this.onShortcutKeyChange}
                  onShortcutDataChange={this.onShortcutDataChange}
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

  onShortcutKeyChange = (e, data) =>  this.setState({shortcutEntry_key_value: data.value});

  onShortcutDataChange = (e, data) => this.setState({shortcutEntry_data_value: data.value});

  closeShortcutEntry = () =>{
    this.setState({
      shortcutEntry_default_key: null,
      shortcutEntry_default_data: null,
      shortcutEntry_key_value: null,
      shortcutEntry_data_value: null,
      shortcutEntry_key_error: null,
      shortcutEntry_data_error: null,
      is_shortcutEntry_open: false
    });
  }

  removeAllShortcuts = () => {
    confirm("Really Bro?");
  }

  removeShortcut = (id) =>{
    console.log(`Shortcut with id: ${id} asks to be removed...`);
  }

  saveShortcut = () =>{ 

    const shortcut = this.state.shortcutEntry_key_value;
    const data = this.state.shortcutEntry_data_value;

    console.log(`Data to be saved: shortcut:${shortcut} | Data:${data}`);

    // check if shortcut or data is not empty
    if(shortcut === "" || shortcut === null){
      this.setState({shortcutEntry_key_error: 'Shortcut cannot be empty..'});
      return;

    }else{
      this.setState({shortcutEntry_key_error: null});
    }

    if(data === "" || data === null){
      this.setState({shortcutEntry_data_error: 'Data cannot be empty..'});
      return;

    }else{ 
      this.setState({shortcutEntry_data_error: null});
    }


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

  getShortcuts = () =>{
    const shortcutList = ipcRenderer.sendSync('get_shortcuts');

    this.setState({shortcut_list: shortcutList});

  }

}

export default App;
