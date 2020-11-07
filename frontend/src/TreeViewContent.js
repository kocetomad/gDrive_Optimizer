import {ArrowDropDown, ArrowDropUp} from "@material-ui/icons";
import {TreeItem, TreeView} from "@material-ui/lab";
import {makeStyles} from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import React from "react";
import Async from "react-async";

function renderTree(files) {
  return <TreeItem key={files.id} nodeId={files.id} label={files.name}>
    {Array.isArray(files.children) ? files.children.map((node) => renderTree(node)) : null}
  </TreeItem>
}

const useStyles = makeStyles((theme) => ({
  circular_progress: {
    display: 'flex',
    '& > * + *': {
      marginLeft: theme.spacing(2),
    },
  },
  tree: {
    height: 216,
    flexGrow: 1,
    maxWidth: 400,
  },
}));

const getRoot = async ({access_token}, {api_key}) => {
  const response = await fetch('https://www.googleapis.com/drive/v3/files/root?key=' + api_key, {
    method: 'GET',
    headers: {
      'Authorization': 'Bearer ' + access_token,
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }
  })
  if (!response.ok) throw new Error(response.statusText)

  return response.json();
}

function TreeViewContent(props) {
  const classes = useStyles();
  const [expandedNodes, setExpanded] = React.useState([]);
  const [selectedNodes, setSelected] = React.useState([]);

  const handleToggle = (event, nodeIds) => {
    setExpanded(nodeIds);
  };

  const handleSelect = (event, nodeIds) => {
    setSelected(nodeIds);
  };

  return (
    <Async promiseFn={getRoot} access_token={props.access_token} api_key={props.api_key}>
      <Async.Pending>
        <div className={classes.circular_progress}>
          <CircularProgress/>
        </div>
      </Async.Pending>
      <Async.Rejected>{error => "Error: " + error}</Async.Rejected>
      <Async.Fulfilled>
        {data =>
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
            {renderTree(data)}
          </TreeView>}
      </Async.Fulfilled>
    </Async>
  )
}

export default TreeViewContent;
