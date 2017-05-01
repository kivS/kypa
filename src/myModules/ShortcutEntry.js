import React, { Component } from 'react';
import { Modal, Button, Container, Input, Divider, TextArea, Form, Label, Popup, Card, List} from 'semantic-ui-react';

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
                  <Popup
                    trigger={<Input size="big" defaultValue={this.props.defaultShortcutKey} onChange={this.props.onShortcutKeyChange} placeholder="Add key combination"/>}
                    on='focus'
                    wide
                    position='right center'
                    >
                    
                    <Card>
                      <Card.Content>
                        <Card.Header>
                          Usage
                        </Card.Header>
                        <Card.Description>
                          The shortcut can contain single or multiple keys combined by the <Label>+</Label> character.
                          <br/>
                          Keys are case insensitive so <Label>ctrl+x</Label> and <Label>CTRL+X</Label> are equivalent.
                          <Divider />
                          <p>Examples:</p>
                          <Label>Control+a</Label>
                          <Label>Ctrl+Shift+a</Label>
                          <Label>Ctrl+Alt+F1</Label>
                        </Card.Description>
                      </Card.Content>
                    </Card>
                  </Popup>
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
                  <Modal closeOnDimmerClick closeIcon dimmer trigger={<Button icon="info" basic content='Show Supported keys'/>}>
                      <Modal.Header> Supported keys:</Modal.Header>
                      <Modal.Content>
                        <Modal.Description>
                          <Card fluid>
                            <Card.Content>
                              <Card.Description>
                                <List bulleted={true}>
                                    <List.Item><Label content="Command (or Cmd for short)"/></List.Item>
                                    <List.Item><Label content="Control (or Ctrl for short)"/></List.Item>
                                    <List.Item><Label content="CommandOrControl (or CmdOrCtrl for short)"/></List.Item>
                                    <List.Item><Label content="Alt"/></List.Item>
                                    <List.Item><Label content="Option"/></List.Item>
                                    <List.Item><Label content="AltGr"/></List.Item>
                                    <List.Item><Label content="Shift"/></List.Item>
                                    <List.Item><Label content="Super"/></List.Item>
                                    <List.Item><Label content="0 to 9"/></List.Item>
                                    <List.Item><Label content="A to Z"/></List.Item>
                                    <List.Item><Label content="F1 to F24"/></List.Item>
                                    <List.Item><Label content="Punctuations like ~, !, @, #, $, etc."/></List.Item>
                                    <List.Item><Label content="Plus"/></List.Item>
                                    <List.Item><Label content="Space"/></List.Item>
                                    <List.Item><Label content="Tab"/></List.Item>
                                    <List.Item><Label content="Backspace"/></List.Item>
                                    <List.Item><Label content="Delete"/></List.Item>
                                    <List.Item><Label content="Insert"/></List.Item>
                                    <List.Item><Label content="Return (or Enter as alias)"/></List.Item>
                                    <List.Item><Label content="Up, Down, Left and Right"/></List.Item>
                                    <List.Item><Label content="Home and End"/></List.Item>
                                    <List.Item><Label content="PageUp and PageDown"/></List.Item>
                                    <List.Item><Label content="Escape (or Esc for short)"/></List.Item>
                                    <List.Item><Label content="VolumeUp, VolumeDown and VolumeMute"/></List.Item>
                                    <List.Item><Label content="MediaNextTrack, MediaPreviousTrack, MediaStop and MediaPlayPause"/></List.Item>
                                    <List.Item><Label content="PrintScreen"/></List.Item>
                                  </List>
                              </Card.Description>
                            </Card.Content>
                          </Card>
                        </Modal.Description>
                      </Modal.Content>
                  </Modal>
                </Container>
              </Modal.Description>
            </Modal.Content>
          </Modal>
      )
  }

}


export default ShortcutEntry;