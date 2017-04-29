import React, { Component } from 'react';
import { Modal, Button, Container, Input, Divider, TextArea, Form, Label} from 'semantic-ui-react';

class ShortcutEntry extends Component{
  constructor(props) {
    super(props);
    
    this.state = {
        shortcut_key: this.props.defaultShortcutKey,
        shortcut_data: this.props.defaultShortcutData
    }  

  }

  render(){

    // Error msgs for inputs
    const onKeyError = (this.props.onKeyError)? <Label basic color='red' pointing>{this.props.onKeyError}</Label>:null;
    const onDataError = (this.props.onDataError)? <Label basic color='red' pointing>{this.props.onDataError}</Label>:null;

    return(
        <Modal open={this.props.open} onClose={this.props.onClose} closeIcon>
            <Modal.Header>Add New Shortcut</Modal.Header>
            <Modal.Content>
              <Modal.Description>
                <Container textAlign="center">
                  <Input size="big" defaultValue={this.props.defaultShortcutKey} onChange={this.onShortcutKeyChange} placeholder="Add key conbination" />
                  <br/>
                  {onKeyError}
                  <Divider hidden/>
                  <Form>
                    <TextArea 
                        autoHeight 
                        placeholder="Enter Text to be saved" 
                        defaultValue={this.props.defaultShortcutData} 
                        onChange={this.onShortcutDataChange}  
                    />
                    {onDataError}
                  </Form>
                  <Divider hidden />
                  <Button 
                      loading={false}
                      icon="save"
                      onClick={() => this.props.saveShortcut(this.state.shortcut_key, this.state.shortcut_data)} 
                      content="Save"
                  />
                </Container>
              </Modal.Description>
            </Modal.Content>
          </Modal>
      )
  }

  // Helper functions

  onShortcutKeyChange = (e, data) => {
    this.setState({shortcut_key: data.value});
  }

  onShortcutDataChange = (e, data) => this.setState({shortcut_data: data.value});
}


export default ShortcutEntry;