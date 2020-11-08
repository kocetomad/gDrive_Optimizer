import {ArrowDropDown, ArrowDropUp} from "@material-ui/icons";
import {TreeItem, TreeView} from "@material-ui/lab";
import {makeStyles} from '@material-ui/core/styles';
import React, {useState} from "react";


function renderTree(files) {
  return <TreeItem key={files.id} nodeId={files.id} label={files.name}>
    {Array.isArray(files.children) ? files.children.map((node) => renderTree(node)) : null}
  </TreeItem>
}

const useStyles = makeStyles((theme) => ({
  tree: {
    height: 216,
    flexGrow: 1,
    maxWidth: 400,
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
    >
      {renderTree(props.files)}
    </TreeView>
  )
}

export default TreeViewContent;
