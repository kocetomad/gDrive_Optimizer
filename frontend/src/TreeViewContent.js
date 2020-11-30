import React, {useState} from "react";
import {ArrowDropDown, ArrowDropUp} from "@material-ui/icons";
import {TreeItem, TreeView} from "@material-ui/lab";
import {makeStyles} from '@material-ui/core/styles';
import {getCheckbox, getIcon} from "./helpers/IconHelpers";

import {getRootChildren} from "./services/rootFolder";

function treeItemClicked(node, expanded_nodes, setExpanded, api_key, access_token) {
  if (node.mimeType === "application/vnd.google-apps.folder") {
    if (expanded_nodes.includes(node.id)) { // folder is already expanded
      let expandedNodes = [...expanded_nodes]
      expandedNodes.splice(expandedNodes.indexOf(node.id), 1)
      setExpanded(expandedNodes)
    } else { // expand folder
      if (!node.children) {
        getRootChildren(api_key, access_token, node.id)
          .then(response => response.json())
          .then(files => {
            console.log(files)
            node.children = files

            let expandedNodes = [...expanded_nodes]
            expandedNodes.push(node.id)
            setExpanded(expandedNodes)
          })
      }
      let expandedNodes = [...expanded_nodes]
      expandedNodes.push(node.id)
      setExpanded(expandedNodes)
    }
  }
}

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
