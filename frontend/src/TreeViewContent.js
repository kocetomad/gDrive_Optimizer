import React, {useState} from "react";
import {ArrowDropDown, ArrowDropUp} from "@material-ui/icons";
import FolderIcon from '@material-ui/icons/Folder';
import MovieIcon from '@material-ui/icons/Movie';
import PhotoIcon from '@material-ui/icons/Photo';
import DescriptionIcon from '@material-ui/icons/Description';
import {TreeItem, TreeView} from "@material-ui/lab";
import {makeStyles} from '@material-ui/core/styles';
import getIcon from "./helpers/getIconHelper";

function renderTree(files) {
  /*return <TreeItem key={files.id} nodeId={files.id} label={files.name}>
    {Array.isArray(files.children) ? files.children.map((node) => renderTree(node)) : null}
  </TreeItem>*/

  return <TreeItem key={files.id}
                   nodeId={files.id}
                   label={<div>{getIcon(files.mimeType)}{files.name}</div>}>
    {Array.isArray(files.children) ? files.children.map((node) => renderTree(node)) : null}
  </TreeItem>
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

  const handleToggle = (event, nodeIds) => {
    setExpanded(nodeIds);
  };

  const handleSelect = (event, nodeIds) => {
    setSelected(nodeIds);
  };

  return (
    <TreeView
      className={classes.tree}
      defaultCollapseIcon={<ArrowDropUp/>}
      defaultExpandIcon={<ArrowDropDown/>}
      defaultExpanded={['root']}
      expanded={expandedNodes}
      selected={selectedNodes}
      onNodeToggle={handleToggle}
      onNodeSelect={handleSelect}
      multiSelect
    >
      {renderTree(props.files)}
    </TreeView>
  )
}

export default TreeViewContent;
