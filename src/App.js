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
      is_shortcutEntry_open: false
    }
  }

  render() {    
    return (
      <Grid>
        <Grid.Row>
          <Grid.Column>
            
            <MenuBar addNew={this.openShortcutEntry} removeAll={this.removeAllShortcuts} />

            <ShortcutEntry open={this.state.is_shortcutEntry_open} onClose={this.closeShortcutEntry} />

            <Divider hidden section />
            
            <ShortcutList />
  
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

}

export default App;
