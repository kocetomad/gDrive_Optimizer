import React, {useEffect, useState} from 'react';
import Card from "react-bootstrap/Card";
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';

import TreeViewContent from "./TreeViewContent";

import {getRootChildren, getRootFolder} from "./services/rootFolder";

/**
 * @description The Google API key for our app.
 * */
const API_KEY = "[AIzaSyBcNCZZIEzsBOI8cyoj-Cb3e8lJe4Qg1Lk]"

/**
 * @description Represents the TreeViewComponent of our gDrive Optimizer App
 * */
function TreeViewComponent(props) {
  // TODO: Mark these constants in the documentation
  /**
   * @description The list of files fetched from Google Drive.
   * */
  const [files, setFiles] = useState({});

  /** @description This is the list of files to be processed. It's setter will be sent to the TreeViewContent prop
   * */
  const [localQueue, setLocalQueue] = useState([]);

  /**
   * @description State used to check if the root folder has been fetched from Drive.
   * */
  const [rootIsSet, setRootPresence] = useState(false);

  /**
   * @description This function is called when the component is first rendered.
   * */
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
          newFiles.children = [{id: 'placeholder', name: 'placeholder_name'}]
          setFiles(newFiles)
          setRootPresence(true)
        }
      })
    return () => {
      mounted = false;
    };
  }, [files, props.access_token])

  /**
   * @description This function is called when the component is rendered and the root folder and it's metadata have been fetched.
   * */
  useEffect(() => {
    let mounted = true;
    if (rootIsSet) {
      getRootChildren(API_KEY, props.access_token, files.id)
        .then(response => response.json())
        .then(data => {
          if (mounted) {
            let newFiles = files
            newFiles.children = data.files
            setFiles(newFiles)
          }
        })
      return () => {
        mounted = false;
      };
    }
  }, [rootIsSet, props.access_token, files])

  useEffect(() => { //whenever the queue is modified, update it
    let mounted = true;
    if(mounted) {
      props.queue_setter(localQueue)
    }
  }, [props, localQueue])
  return (
    <Card className="h-100">
      <Card.Body>
        <Card.Title>Drive Content</Card.Title>
        {files && <TreeViewContent queue_setter={setLocalQueue} files={files} access_token={props.access_token} user_email={props.user_email}
                                   api_key={API_KEY}/>}
      </Card.Body>
    </Card>
  )
}

/**
 * The TreeViewComponent module. It handles all operations of the TreeView functionality.
 * @module TreeViewComponent
 * */
export default TreeViewComponent;
