import React, {useState} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import {Card, ListGroup, ListGroupItem} from "react-bootstrap";
import {ArrowDropDown, Folder} from "@material-ui/icons";

/*
Get root folder - do a GET list request with 'root' as FOLDER_ID
Get list of files from root Google Drive folder - GET https://www.googleapis.com/drive/v3/files?q=parents%3D'root'&key=[YOUR_API_KEY]
* */

function TreeView(props) {
  //TODO: Maybe add that scan function here? Refer to the other TODO.
  // IDK how to properly define it so it matches ReactJS workflow and standards

  return (
    <Card>
      <Card.Title><h2>Something</h2></Card.Title>
      <TreeElement title={"Root Folder (which also has an ID)"}/>
      <TreeElements elements={props.files}/>
    </Card>
  )
}

function TreeElements(props) {
  //TODO: Make a function that scans each element from root and checks if there is any more stuff inside them.
  // Can be same method used to scan for a specific element.

  return (
    <ListGroup variant="flush" style={{paddingLeft: "20px"}}>
      <TreeElement title={props.elements[0].id}/>
      <TreeElement title={props.elements[1].id}/>
      <ListGroup variant="flush" style={{paddingLeft: "20px"}}>
        <TreeElement title={props.elements[2].id}/>
        <TreeElement title={props.elements[3].id}/>
        <TreeElement title={props.elements[4].id}/>
      </ListGroup>
      <TreeElement title={props.elements[5].id}/>
    </ListGroup>
  )
}

function TreeElement(props) {
  const [title, setTitle] = useState(props.title)
  const [icon, setIcon] = useState(null)

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
            {title}
          </td>
        </tr>
        </tbody>
      </table>
    </ListGroupItem>
  )
}

export default TreeView;
