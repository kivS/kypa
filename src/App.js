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
  }
  
  render() {    
    return (
      <Grid>
        <Grid.Row>
          <Grid.Column>
            
            <MenuBar />

            <ShortcutEntry />

            <Divider hidden section />
            
            <ShortcutList />
  
          </Grid.Column>
        </Grid.Row>
      </Grid>
    );
  }
}

export default App;
