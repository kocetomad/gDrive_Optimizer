import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import {Card, ListGroup, ListGroupItem} from "react-bootstrap";
import {ArrowDropDown, Folder} from "@material-ui/icons";

/*
Get root folder - do a GET list request with 'root' as FOLDER_ID
Get list of files from root Google Drive folder - GET https://www.googleapis.com/drive/v3/files?q=parents%3D'root'&key=[YOUR_API_KEY]
* */

class TreeView extends React.Component {
  //TODO: Maybe add that scan function here? Refer to the other TODO.
  // IDK how to properly define it so it matches ReactJS workflow and standards
  render() {
    return (
      <Card>
        <TreeElement title={"Root Folder (which also has an ID)"}/>
        <TreeElements elements={this.props.files}/>
      </Card>
    );
  }
}

class TreeElements extends React.Component {
  //TODO: Make a function that scans each element from root and checks if there is any more stuff inside them.
  // Can be same method used to scan for a specific element.

  render() {
    return (
      <ListGroup variant="flush" style={{paddingLeft: "20px"}}>
        <TreeElement title={this.props.elements[0].id}/>
        <TreeElement title={this.props.elements[1].id}/>
        <ListGroup variant="flush" style={{paddingLeft: "20px"}}>
          <TreeElement title={this.props.elements[2].id}/>
          <TreeElement title={this.props.elements[3].id}/>
          <TreeElement title={this.props.elements[4].id}/>
        </ListGroup>
        <TreeElement title={this.props.elements[5].id}/>
      </ListGroup>
    )
  }
}

class TreeElement extends React.Component {
  constructor(props) {
    super(props);

    // we use isParent to note if the element has more elements inside (a folder with files) so we show dropdown arrow
    // or the element is a file or an empty folder, in which case we don't show a dropdown arrow
    this.state = {title: props.title, icon: props.icon}
  }

  componentDidMount() {
    // this function is called whenever the element is rendered to the DOM
  }

  componentWillUnmount() {
    // this function is called whenever the element is removed from the DO
  }

  render() {
    return (
      <ListGroupItem action>
        <table>
          <tbody>
          <tr>
            <td style={{paddingRight: "10px"}}>
              <ArrowDropDown/>
            </td>
            <td style={{paddingRight: "10px"}}>
              <Folder/>
            </td>
            <td>
              <span>{this.state.title}</span>
            </td>
          </tr>
          </tbody>
        </table>
      </ListGroupItem>
    )
  }
}

export default TreeView;
