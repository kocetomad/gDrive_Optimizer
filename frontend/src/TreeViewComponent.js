import React, {useEffect, useState} from 'react';
import Card from "react-bootstrap/Card";
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import CircularProgress from '@material-ui/core/CircularProgress';

import TreeViewContent from "./TreeViewContent";

import {getRootFolder, getRootChildren} from "./services/rootFolder";
import {makeStyles} from "@material-ui/core/styles";

const API_KEY = "[AIzaSyBcNCZZIEzsBOI8cyoj-Cb3e8lJe4Qg1Lk]"

const useStyles = makeStyles((theme) => ({
  circular_progress: {
    display: 'flex',
    '& > * + *': {
      marginLeft: theme.spacing(2),
    },
  },
}));

function TreeViewComponent(props) {
  const classes = useStyles();

  const [files, setFiles] = useState({});
  const [rootIsSet, setRootPresence] = useState(false);

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

  useEffect(() => {
    let mounted = true;
    getRootFolder(API_KEY, props.access_token)
      .then(response => response.json())
      .then(data => {
          if (mounted) {
            console.log("getting root folder")
            setFiles(data)
            setRootPresence(true)
          }
        }
      );
  }, [props.access_token])

  useEffect(() => {
    let mounted = true;
    if(rootIsSet) {
      getRootChildren(API_KEY, props.access_token, files.id)
        .then(response => response.json())
        .then(data => {
          if (mounted) {
            console.log("root children data here: " + data)
          }
        })
      return () => {
        mounted = false;
      };
    }
  },[rootIsSet, props.access_token, files.id])

  return (
    <Card>
      <Card.Title>
        TreeView
      </Card.Title>
      <Card.Body>
        {!files && <CircularProgress className={classes.circular_progress}/>}
        {files && <TreeViewContent files={files}/>}
      </Card.Body>
    </Card>
  )
}

export default TreeViewComponent;
