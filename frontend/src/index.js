import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import * as serviceWorker from './serviceWorker';
import {Card, ListGroup, ListGroupItem} from "react-bootstrap";
import {ArrowDropDown, Folder} from "@material-ui/icons";

/*
Get root folder - do a GET list request with 'root' as FOLDER_ID
Get list of files from root Google Drive folder - GET https://www.googleapis.com/drive/v3/files?q=parents%3D'root'&key=[YOUR_API_KEY]
* */
const API_OUTPUT = {
  "kind": "drive#fileList",
  "nextPageToken": "~!!~AI9FV7QeP3koOwcQ0BM4R-Il_Gce2V3laa52r3xp6UYYKc4sPAVr-kLOEHZyBym2-P0OTljaTyjNCflRk2UPGCKoiLYdkR8SdfkCNDg3GoJV707znrXbOUQEvCu5xBnrE2ZvSRRA0w2RHnSrMVrMM70yld_FKUoR_CJAqfrVkWutXBQ9GkpDDABIOYFOv84rS2c5DFeOCsXkHTF1bumfz_f3KjwUoSNZiYPm7F4jGHPw-j83vaVafhBaHYL46mAv2d3DzOJBSJvvF_tFY80NljIAeml2KH-uhn_hf0nPQ4IWifcik5SLflhcmJhIVp6FT406fSINUcgrWcYWPpk3UDY-3jHTVspmU2W_Ahb8LRqi0EezTjvzydCyYxSL6dAX1vtSytHQMLLy",
  "incompleteSearch": false,
  "files": [
    {
      "kind": "drive#file",
      "id": "1GT7BLOeDI_VTHpfoK__G9vB_eT9gh2-l",
      "name": "resources",
      "mimeType": "application/vnd.google-apps.folder"
    },
    {
      "kind": "drive#file",
      "id": "1WItj1m3uZgsnkA6D6EftuXGNBiBj_k1F",
      "name": "resources",
      "mimeType": "application/vnd.google-apps.folder"
    },
    {
      "kind": "drive#file",
      "id": "1cjGy2k6Yr70IlosLH8qHl5RPtJ2YwxPN",
      "name": "resources",
      "mimeType": "application/vnd.google-apps.folder"
    },
    {
      "kind": "drive#file",
      "id": "1An4XeVtLMlmHdJiv5k1uuUkTGzr95R8n",
      "name": "resources",
      "mimeType": "application/vnd.google-apps.folder"
    },
    {
      "kind": "drive#file",
      "id": "1UH9irztyBB-qbiASBEc-HfjN6xFPK5SR",
      "name": "res",
      "mimeType": "application/vnd.google-apps.folder"
    },
    {
      "kind": "drive#file",
      "id": "1D39W5Nr8KzB-SH2oAjHCwa5uj5jnw8V5",
      "name": "images",
      "mimeType": "application/vnd.google-apps.folder"
    },
    {
      "kind": "drive#file",
      "id": "1jMHLhgy5fJkXpplOaT3xSy3Pq27qB8oF",
      "name": "images",
      "mimeType": "application/vnd.google-apps.folder"
    },
    {
      "kind": "drive#file",
      "id": "1XnqXv6OCjYS41mdKNAp07jRzzOir8Qmy",
      "name": "resources",
      "mimeType": "application/vnd.google-apps.folder"
    },
    {
      "kind": "drive#file",
      "id": "1HWXOZKjCOyQfFeY0FDslhl4Lz613X6RH",
      "name": "images",
      "mimeType": "application/vnd.google-apps.folder"
    },
    {
      "kind": "drive#file",
      "id": "1Qz-n0v8gj7sHIlJ1dXScqbpF4D947NCE",
      "name": "images",
      "mimeType": "application/vnd.google-apps.folder"
    }
  ]
}

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

// ========================================

ReactDOM.render(
  <TreeView files={API_OUTPUT.files}/>,

  document.getElementById('root')
);


// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
