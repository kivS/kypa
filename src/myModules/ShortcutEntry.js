import React, { Component } from 'react';
import { Modal, Button, Container, Input, Divider, TextArea, Form, Label} from 'semantic-ui-react';

class ShortcutEntry extends Component{
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
                  <Input size="big" defaultValue={this.props.defaultShortcutKey} onChange={this.props.onShortcutKeyChange} placeholder="Add key combination" />
                  <br/>
                  {onKeyError}
                  <Divider hidden/>
                  <Form>
                    <TextArea 
                        autoHeight 
                        placeholder="Enter Text to be saved" 
                        defaultValue={this.props.defaultShortcutData} 
                        onChange={this.props.onShortcutDataChange}  
                    />
                    {onDataError}
                  </Form>
                  <Divider hidden />
                  <Button 
                      loading={false}
                      icon="save"
                      onClick={this.props.saveShortcut} 
                      content="Save"
                  />
                </Container>
              </Modal.Description>
            </Modal.Content>
          </Modal>
      )
  }

}


export default ShortcutEntry;