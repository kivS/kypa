import React, { Component } from 'react';
import { Header, Button, Container, Table, Label} from 'semantic-ui-react'

class ShortcutList extends Component{
  render(){
    const table_body = this.props.list.map((data, index) => {
      return(
          <Table.Row key={data.id}>
            <Table.Cell content={data.time_added} />
            <Table.Cell>
              <Label content={data.shortcut} />
            </Table.Cell>
            <Table.Cell content={data.text} />
            <Table.Cell><Button icon='delete'  circular onClick={() => this.props.removeShortcut(data.id)} /></Table.Cell>
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
