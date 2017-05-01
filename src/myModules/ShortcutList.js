import React, { Component } from 'react';
import { Header, Button, Container, Table, Label, Divider,Popup} from 'semantic-ui-react'
import moment from 'moment';

class ShortcutList extends Component{
  render(){

    const searchValue = this.props.searchValue;
    let data_list;

    // if search value exists lets filter the list
    if(searchValue){

      data_list = this.props.list.filter((data) =>{
        // filter items that match shortcut or text
        return data.text.includes(searchValue) || data.shortcut.includes(searchValue);

      });

    }else{
      data_list = this.props.list;
    }

    const table_body = data_list.map((data, index) => {
      return(
          <Table.Row key={data.id}>
            <Table.Cell content={moment(data.time_added).format("DD/MM/Y - H:m")} />
            <Table.Cell>
              <Label content={data.shortcut} />
            </Table.Cell>
            <Table.Cell content={data.text} />
            <Table.Cell>
              <Popup trigger={<Button icon='edit'  circular onClick={() => this.props.updateShortcut(data)} />} content="Edit shortcut" />
              <Divider />
              <Popup trigger={<Button icon='remove'  circular onClick={() => this.props.removeShortcut(data.id)} />} content="Remove shortcut" />
            </Table.Cell>
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
