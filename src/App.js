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
      shortcutEntry_update_for_id: null,
      
      shortcut_list: null,

      search_loading: false,
      search_value : null

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
            
            <MenuBar 
              addNew={this.openShortcutEntry} 
              removeAll={this.removeAllShortcuts} 
              searchLoading={this.state.search_loading} 
              onSearch={this.onSearch} 
              onSearchStop={this.onSearchStop}
            />

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
            
            <ShortcutList 
              list={this.state.shortcut_list} 
              searchValue={this.state.search_value} 
              updateShortcut={this.updateShortcut} 
              removeShortcut={this.removeShortcut} 
            />
  
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
      is_shortcutEntry_open: false,
      shortcutEntry_default_key: null,
      shortcutEntry_default_data: null,
      shortcutEntry_key_value: null,
      shortcutEntry_data_value: null,
      shortcutEntry_key_error: null,
      shortcutEntry_data_error: null,
      shortcutEntry_update_for_id: null
    });
  }

  removeAllShortcuts = () => {
    if(confirm("You're about to delete all shortcuts. Continue?")){
      ipcRenderer.send('delete_all_shortcut');
      this.getShortcuts();
    }
  }

  updateShortcut = (data) =>{
    console.log('Update shortcut: ', data.id);
    this.setState({
      shortcutEntry_default_key: data.shortcut,
      shortcutEntry_default_data: data.text,
      shortcutEntry_update_for_id: data.id,
      is_shortcutEntry_open: true
    });
  }

  removeShortcut = (id) =>{
    console.log(`Shortcut with id: ${id} asks to be removed...`);
    ipcRenderer.send('delete_shortcut', id);
    this.getShortcuts();
  }

  saveShortcut = () =>{

    // if shortcut is to be updated lets remove it first
    const update_for_id = this.state.shortcutEntry_update_for_id;
    if(update_for_id) this.removeShortcut(update_for_id);

    // get shortcut and data or default 
    const shortcut = this.state.shortcutEntry_key_value || this.state.shortcutEntry_default_key;
    const data = this.state.shortcutEntry_data_value || this.state.shortcutEntry_default_data;

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
      this.getShortcuts();
      this.closeShortcutEntry();
    }


    console.log('Result: ', register_shortcut);

  }

  getShortcuts = () =>{
    const shortcutList = ipcRenderer.sendSync('get_shortcuts');

    this.setState({shortcut_list: shortcutList});

  }

  onSearch = (e, data) =>{
    this.setState({search_loading: true});

    const searchValue = data.value;

    if(searchValue.length > 1){
      this.setState({search_value: searchValue});

    }else{
      this.setState({search_value: null});
    }

    //console.log('search data: ', data);
  }

  onSearchStop = () =>{
    this.setState({search_loading: false});
  }

}

export default App;
