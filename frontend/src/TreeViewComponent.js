import React, {useState, useEffect} from 'react';
import {Button, Card} from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import {TreeItem, TreeView} from '@material-ui/lab';
import {ArrowDropDown, ArrowDropUp} from "@material-ui/icons";

/*
Get root folder - do a GET list request with 'root' as FOLDER_ID
*/

const API_KEY = "[AIzaSyBcNCZZIEzsBOI8cyoj-Cb3e8lJe4Qg1Lk]"

function TreeViewComponent(props) {
  const [files, setFiles] = useState({
    id: '0',
    name: 'root',
    children: [
      {
        id: '1',
        name: 'Child - 1',
      },
      {
        id: '2',
        name: 'Child - 2',
        children: [
          {
            id: '21',
            name: 'Child - 2.1',
          },
        ],
      },
    ],
  })
  const [rootID, setRootID] = useState("")

  const[counter, setCounter] = useState(0)

  const renderTree = (files) => (
    <TreeItem key={files.id} nodeId={files.id} label={files.name}>
      {Array.isArray(files.children) ? files.children.map((node) => renderTree(node)) : null}
    </TreeItem>
  );

  let getRoot = (accessToken, files) => {
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
        setRootID(data.id.toString())
        console.log(files)
      })
      .catch(() => {
        console.error({response: 'Error fetching!'});
      })
  }

  let getFiles = (accessToken, parentID) => {
    fetch( // main request
      'https://www.googleapis.com/drive/v3/files?q=parents%3D%22' + parentID + '%22&?key=' + API_KEY,
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

  return (
    <Card>
      <Card.Body>
        <Button onClick={() => getRoot(props.access_token, files)}>Get Root</Button>
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
