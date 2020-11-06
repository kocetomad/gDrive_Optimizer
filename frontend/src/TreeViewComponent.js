import React, {useState} from 'react';
import {Button, Card} from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import {TreeItem, TreeView} from '@material-ui/lab';
import {ArrowDropDown, ArrowDropUp} from "@material-ui/icons";

const API_KEY = "[AIzaSyBcNCZZIEzsBOI8cyoj-Cb3e8lJe4Qg1Lk]"

function TreeViewComponent(props) {
  const [files, setFiles] = useState({})
  const [rootID, setRootID] = useState("")

  const[counter, setCounter] = useState(0)

  const getRoot = (accessToken) => {
    fetch('https://www.googleapis.com/drive/v3/files/root?key=' + API_KEY, {
      method: 'GET',
      headers: {
        'Authorization': 'Bearer ' + accessToken,
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    })
      .then(async response => {
        const data = await response.json();

        // check for error response
        if (!response.ok) {
          // get error message from body or default to response statusText
          const error = (data.error.code && data.error.message) || response.statusText;

          console.error(error)
          return Promise.reject(error);
        }
        console.log(data)

        let newFiles = files
        newFiles.id = data.id
        newFiles.name = data.name
        newFiles.children = []
        setFiles(newFiles)
        console.log(newFiles)

        setRootID(data.id.toString())
      })
      .catch(() => {
        console.error({response: 'Error fetching!'});
      })
  }

  const getFiles = (accessToken, parentID) => {
    fetch( // main request
      'https://www.googleapis.com/drive/v3/files?' +
      'q=parents%3D%22' + parentID + '%22' +
      '%20and%20trashed%3Dfalse' +
      '&fields=files(kind%2C%20id%2C%20name%2C%20mimeType%2C%20trashed)' +
      '&key=' + API_KEY,
      // 'https://www.googleapis.com/drive/v3/files?' +
      // 'q=parents%3D%22' + parentID + '%22&' +
      // '' +
      // 'fields=files(kind%2C%20id%2C%20name%2C%20mimeType%2C%20trashed)'+
      // '?key=' + API_KEY,
      {
        method: 'GET',
        headers: {
          'Authorization': 'Bearer ' + accessToken,
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      }
    )
      .then(async response => {
        const data = await response.json();

        // check for error response
        if (!response.ok) {
          // get error message from body or default to response statusText
          const error = (data && data.message) || response.statusText;
          return Promise.reject(error);
        }
        console.log(data.files)

        let child, newFiles
        newFiles = files
        for (child of data.files) {
          newFiles.children.push({id: child.id, name: child.name})
        }

        setFiles(newFiles)
      })
      .catch((error) => {
        console.error({response: 'Error performing fetch!', error: error});
      })
  }

  function changeCounter(amount) {
    setCounter(amount + 1)
  }

  const renderTree = (files) => (
    <TreeItem key={files.id} nodeId={files.id} label={files.name}>
      {Array.isArray(files.children) ? files.children.map((node) => renderTree(node)) : null}
    </TreeItem>
  );

  return (
    <Card>
      <Card.Body>
        <Button onClick={() => getRoot(props.access_token)}>Get Root</Button>
        <Button onClick={() => getFiles(props.access_token, rootID)}>Get Children</Button>

        <Button onClick={() => changeCounter(counter)}>{counter}</Button>
        <TreeView
          defaultCollapseIcon={<ArrowDropUp/>}
          defaultExpanded={['root']}
          defaultExpandIcon={<ArrowDropDown/>}
        >
          {renderTree(files)}
        </TreeView>
      </Card.Body>
    </Card>
  )
}

export default TreeViewComponent;
