import React, {useEffect, useState} from 'react';
import Card from "react-bootstrap/Card";
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import CircularProgress from '@material-ui/core/CircularProgress';

import TreeViewContent from "./TreeViewContent";

import {getRootChildren, getRootFolder} from "./services/rootFolder";
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

  useEffect(() => {
    let mounted = true;
    getRootFolder(API_KEY, props.access_token)
      .then(response => response.json())
      .then(data => {
        if (mounted) {
          let newFiles = files
          newFiles.id = data.id
          newFiles.name = data.name
          newFiles.mimeType = data.mimeType
          newFiles.children = []
          setFiles(newFiles)
          setRootPresence(true)
          console.log("got root folder")
        }
      })
    return () => {
      mounted = false;
    };
  }, [props.access_token])

  useEffect(() => {
    let mounted = true;
    if (rootIsSet) {
      getRootChildren(API_KEY, props.access_token, files.id)
        .then(response => response.json())
        .then(data => {
          if (mounted) {
            console.log(data.files)
            let newFiles = files
            newFiles.children = data.files
            setFiles(newFiles)
          }
        })
      return () => {
        mounted = false;
      };
    }
  }, [rootIsSet, props.access_token, files.id])

  return (
    <Card>
      <Card.Title>
        Drive Content
      </Card.Title>
      <Card.Body>
        {!files && <CircularProgress className={classes.circular_progress}/>}
        {files && <TreeViewContent files={files}/>}
      </Card.Body>
    </Card>
  )
}

export default TreeViewComponent;
