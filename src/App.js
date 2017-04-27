import React, { Component } from 'react';
import { Icon, Button, Grid, Container, Input, Divider, TextArea, Form, Table} from 'semantic-ui-react'
import './App.css';

const {ipcRenderer} = window.require('electron');


class App extends Component {
  render() {
    return (
      <Grid className="main_container">

        <Grid.Row className="entry_area">
          <Grid.Column textAlign="center">
            <Container>
              <Divider hidden />
              <Input size="big" placeholder="Add key conbination" />
              <Divider hidden/>
              <Form>
                <TextArea autoHeight placeholder="Enter Text to be saved" />
              </Form>
              <Divider hidden />
              <Button icon="save" content="Save"/>
            </Container>
          </Grid.Column>
        </Grid.Row>
          
        <Divider />

        <Grid.Row className="entries_list_area">
          <Grid.Column>
            <Container>
              <Table  padded celled striped>
                <Table.Header>
                  <Table.Row>
                    <Table.HeaderCell collapsing >Time Added</Table.HeaderCell>
                    <Table.HeaderCell>Shortcut</Table.HeaderCell>
                    <Table.HeaderCell>Text</Table.HeaderCell>
                    <Table.HeaderCell collapsing />
                  </Table.Row>
                </Table.Header>

                <Table.Body>

                  <Table.Row>
                    <Table.Cell content="potato 1" />
                    <Table.Cell content="potato 1" />
                    <Table.Cell content="potato 1" />
                    <Table.Cell><Button icon='delete'  circular /></Table.Cell>
                  </Table.Row>

                  <Table.Row>
                     <Table.Cell content="potato 2" />
                     <Table.Cell content="potato 2" />
                     <Table.Cell content="potato 2" />
                     <Table.Cell><Button icon='delete' circular /></Table.Cell>
                  </Table.Row>

                </Table.Body>
                
                <Table.Footer>
                  <Table.Row>
                     <Table.HeaderCell colSpan="4">
                        <Button floated='right' icon labelPosition='left' primary negative size='small'>
                          <Icon name='trash outline' /> Remove all
                        </Button>
                     </Table.HeaderCell>
                  </Table.Row>
                </Table.Footer>
          
              </Table>
            </Container>
          </Grid.Column>
        </Grid.Row>

      </Grid>
    );
  }
}

export default App;
