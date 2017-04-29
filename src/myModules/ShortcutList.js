import React, { Component } from 'react';
import { Header, Button, Container, Table} from 'semantic-ui-react'

class ShortcutList extends Component{
  render(){
    const table_body = this.props.list.map((data, index) => {
      return(
          <Table.Row key={index}>
            <Table.Cell content="potato 1" />
            <Table.Cell content="potato 1 " />
            <Table.Cell content="potato 1" />
            <Table.Cell><Button icon='delete'  circular onClick={() => this.props.removeShortcut(index)} /></Table.Cell>
          </Table.Row>
        )
    });
    return (
        <Container>
          <Table  padded celled striped>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell colSpan="4">
                   <Header as='h3' textAlign='center'>Shortcut List</Header>
                </Table.HeaderCell>
              </Table.Row>
              <Table.Row>
                <Table.HeaderCell collapsing >Time Added</Table.HeaderCell>
                <Table.HeaderCell>Shortcut</Table.HeaderCell>
                <Table.HeaderCell>Text</Table.HeaderCell>
                <Table.HeaderCell collapsing />
              </Table.Row>
            </Table.Header>

            <Table.Body>
              {table_body}
            </Table.Body>
            
          </Table>
        </Container>
      )
  }
}

export default ShortcutList;
