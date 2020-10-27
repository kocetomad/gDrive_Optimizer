import React, {useEffect, useState} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import {Button, Card} from "react-bootstrap";
//import {ArrowDropDown, ArrowDropUp, Folder} from "@material-ui/icons";
import SuperTreeview from "react-super-treeview";
import './treeView.css'

/*
Get root folder - do a GET list request with 'root' as FOLDER_ID
* */

const API_KEY = "[AIzaSyBcNCZZIEzsBOI8cyoj-Cb3e8lJe4Qg1Lk]"

function TreeViewComponent(props) {
  //TODO: Maybe add that scan function here? Refer to the other TODO.
  // IDK how to properly define it so it matches ReactJS workflow and standards
  const [files, setFiles] = useState([
    {id: "ajksnasdmgfnaswrg", name: "Parent 1"},{id:"asdnnasgasgd", name: "Parent 2"}
  ])

  let getRoot = (accessToken) => {
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
        files.push({
          id: data.id,
          name: data.name,
          isExpanded: false,
          isChecked: false,
          isChildrenLoading: false,
          children: []
        })
        setFiles(files)
      })
      .catch(() => {
        console.error({response: 'Error fetching!'});
      })
  }

  let getFiles = (accessToken, parent) => {
    console.log(accessToken)
    fetch( // main request
      'https://www.googleapis.com/drive/v3/files?key=' + API_KEY,
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
        console.log(data)
        setFiles(data.files)
      })
      .catch((error) => {
        console.error({response: 'Error performing fetch!', error: error});
      })
  }

  useEffect(() => {
    console.log("updated")
  })

  return (
    <Card>
      <Card.Body>
        <Button onClick={() => getRoot(props.access_token)}>Refresh</Button>
        <SuperTreeview
          data={files}
          onUpdateCb={(updatedData) => {
            setFiles(updatedData)
          }}
        />
      </Card.Body>
    </Card>
  )
}

export default TreeViewComponent;
