import React, { Component } from 'react';
import { Modal, Button, Container, Input, Divider, TextArea, Form} from 'semantic-ui-react';

class ShortcutEntry extends Component{
  render(){
    return(
        <Modal open={false} closeIcon>
            <Modal.Header>Add New Shortcut</Modal.Header>
            <Modal.Content>
              <Modal.Description>
                <Container textAlign="center">
                  <Input size="big" placeholder="Add key conbination" />
                  <Divider hidden/>
                  <Form>
                    <TextArea autoHeight placeholder="Enter Text to be saved" />
                  </Form>
                  <Divider hidden />
                  <Button loading={false} icon="save" content="Save"/>
                </Container>
              </Modal.Description>
            </Modal.Content>
          </Modal>
      )
  }
}


export default ShortcutEntry;