import React, {useState} from "react";
import {ArrowDropDown, ArrowDropUp} from "@material-ui/icons";
import {TreeItem, TreeView} from "@material-ui/lab";
import {makeStyles} from '@material-ui/core/styles';
import {getCheckbox, getIcon} from "./helpers/IconHelpers";

import {getRootChildren} from "./services/rootFolder";


const useStyles = makeStyles((theme) => ({
  tree: {
    height: '100%',
    flexGrow: 1,
    maxWidth: '100%',
  },
}));

function TreeViewContent(props) {
  const classes = useStyles();
  const [expandedNodes, setExpanded] = useState([]);
  const [selectedNodes, setSelected] = useState([]);

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
              let files = output.files
              console.log(files)
              node.children = files

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

  function renderTree(node) {
    return (
      <TreeItem nodeId={node.id}
                key={node.id}
                label={<div>{getCheckbox(node, selectedNodes, setSelected)}{getIcon(node.mimeType)}{node.name}</div>}
                onClick={() => {treeItemClicked(node, expandedNodes, setExpanded, props.api_key, props.access_token)}}
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

  return (
    <TreeView
      className={classes.tree}
      defaultCollapseIcon={<ArrowDropUp/>}
      defaultExpandIcon={<ArrowDropDown/>}
      expanded={expandedNodes}
      //defaultExpanded={[props.files.id]}
      //selected={selectedNodes}
      //onNodeToggle={handleToggle}
      //onNodeSelect={handleSelect}
    >
      {renderTree(props.files)}
    </TreeView>
  )
}

export default TreeViewContent;
