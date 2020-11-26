import React, {useState} from "react";
import {ArrowDropDown, ArrowDropUp} from "@material-ui/icons";
import {TreeItem, TreeView} from "@material-ui/lab";
import {makeStyles} from '@material-ui/core/styles';
import {getCheckbox, getIcon} from "./helpers/IconHelpers";

function treeItemClicked(file, expanded_nodes, setExpanded) {
  if (file.mimeType === "application/vnd.google-apps.folder") {
    if (expanded_nodes.includes(file.id)) { // folder is already expanded
      console.log("clicked on expanded file")
      let expandedNodes = [...expanded_nodes]
      expandedNodes.splice(expandedNodes.indexOf(file.id), 1)
      setExpanded(expandedNodes)
    } else { // expand folder
      console.log(expanded_nodes)
      let expandedNodes = [...expanded_nodes]
      expandedNodes.push(file.id)
      setExpanded(expandedNodes)
    }
  }
}

function renderTree(file, selected_nodes, setSelected, expanded_nodes, setExpanded) {
  return (
    <TreeItem nodeId={file.id}
              key={file.id}
              label={<div>{getCheckbox(file, selected_nodes, setSelected)}{getIcon(file.mimeType)}{file.name}</div>}
              onClick={() => {treeItemClicked(file, expanded_nodes, setExpanded)}}
    >
      {
        file.mimeType === "application/vnd.google-apps.folder" ?
          (Array.isArray(file.children) ?
            file.children.map((node) => renderTree(node, selected_nodes, setSelected, expanded_nodes, setExpanded))
            : <div/>)
          : null
      }
    </TreeItem>
  )
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
      {renderTree(props.files, selectedNodes, setSelected, expandedNodes, setExpanded)}
    </TreeView>
  )
}

export default TreeViewContent;
