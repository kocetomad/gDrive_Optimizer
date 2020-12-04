import React, {useState} from "react";
import Button from "react-bootstrap/Button";
import {ArrowDropDown, ArrowDropUp} from "@material-ui/icons";
import {TreeItem, TreeView} from "@material-ui/lab";
import {makeStyles} from '@material-ui/core/styles';
import {getCheckbox, getIcon} from "./helpers/IconHelpers";

import {getRootChildren} from "./services/rootFolder";

/**
 * @description This represents the styles used for the TreeView component
 * */
const useStyles = makeStyles((theme) => ({
  tree: {
    height: '100%',
    flexGrow: 1,
    maxWidth: '100%',
  },
}));

/**
 * @description Wrapper for the TreeView component. It also stores some logic.
 */
function TreeViewContent(props) {
  // TODO: Explain how the current implementation is how it is.
  //  Why it has been changed (touch events from treeview lib vs in-house implementation)
  const classes = useStyles();
  const [expandedNodes, setExpanded] = useState([]);
  const [selectedNodes, setSelected] = useState([]);


  /**
   * @description This represents the function callback when a treeItem is clicked.
   */
  function treeItemClicked(node) {
    if (node.mimeType === "application/vnd.google-apps.folder") {
      if (expandedNodes.includes(node.id)) { // folder is already expanded
        let newExpandedNodes = [...expandedNodes]
        newExpandedNodes.splice(newExpandedNodes.indexOf(node.id), 1)
        setExpanded(newExpandedNodes)
      } else { // expand folder
        if (!node.children) {
          getRootChildren(props.api_key, props.access_token, node.id)
            .then(response => response.json())
            .then(output => {
              node.children = output.files

              let newExpandedNodes = [...expandedNodes]
              newExpandedNodes.push(node.id)
              setExpanded(newExpandedNodes)
            })
        }
        let newExpandedNodes = [...expandedNodes]
        newExpandedNodes.push(node.id)
        setExpanded(newExpandedNodes)
      }
    }
  }

  /**
   * @description This represents the function which is called to render the TreeView.
   * It is called recursively for each node that has children.
   */
  function renderTree(node) {
    return (
      <TreeItem nodeId={node.id}
                key={node.id}
                label={<div>{getCheckbox(node, selectedNodes, setSelected)}{getIcon(node.mimeType)}{node.name}</div>}
                onClick={() => {
                  treeItemClicked(node, expandedNodes, setExpanded, props.api_key, props.access_token)
                }}
      >
        {
          node.mimeType === "application/vnd.google-apps.folder" ?
            (Array.isArray(node.children) ?
              node.children.map((node) => renderTree(node))
              : <div/>)
            : null
        }
      </TreeItem>
    )
  }

  /**
   * @description This function sends the list of files to compress to the backend.
   */
  function sendFiles(files) {
    // const data = {
    //   fileID: files,
    //   token: props.access_token,
    //   email: props.user_email
    // }
    //
    // fetch('http://punchy.servebeer.com:4000/fetchMultipleFiles', {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //     'Accept': 'application/json',
    //   },
    //   body: JSON.stringify(data),
    // })
    //   .then(response => response.json())
    //   .then(data => {
    //     console.log('Success:', data);
    //     // TODO: Set state that request has been successful
    //   })
    //   .catch((error) => {
    //     console.error('Error:', error);
    //   });
  }

  return (<div>
      <TreeView
        className={classes.tree}
        defaultCollapseIcon={<ArrowDropUp/>}
        defaultExpandIcon={<ArrowDropDown/>}
        expanded={expandedNodes}
      >
        {renderTree(props.files)}
      </TreeView>
      <Button onClick={() => {
        props.queue_setter(selectedNodes)
      }}>Compress</Button>
    </div>
  )
}

/**
 * The TreeViewContent module. It hosts all contents of the TreeView.
 * @module TreeViewContent
 * */
export default TreeViewContent;
