import React from "react";

import FolderIcon from "@material-ui/icons/Folder";
import MovieIcon from "@material-ui/icons/Movie";
import PhotoIcon from "@material-ui/icons/Photo";
import DescriptionIcon from "@material-ui/icons/Description";

import InsertDriveFileIcon from '@material-ui/icons/InsertDriveFile';

import CheckBoxIcon from '@material-ui/icons/CheckBox';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';

function handleCheckboxClick(file, selected_nodes, setSelected, setQueue) {
  let selectedNodes = [...selected_nodes]
  if (file.mimeType !== "application/vnd.google-apps.folder") {
    if (selectedNodes.includes(file.id)) { // file is already checked
      //let selectedNodes = [...selected_nodes]
      selectedNodes.splice(selectedNodes.indexOf(file.id), 1)
      setSelected(selectedNodes)
      setQueue(selectedNodes)
    } else {
      //let selectedNodes = [...selected_nodes]
      selectedNodes.push(file.id)
      setSelected(selectedNodes)
      setQueue(selectedNodes)
    }
  }
}

function getCheckbox(file, selected_nodes, setSelected, setQueue) {
  if (selected_nodes.includes(file.id)) {
    return <CheckBoxIcon onClick={(event) => {
      event.stopPropagation() // this is used to stop the main div from sending onClick events. just this div.
      handleCheckboxClick(file, selected_nodes, setSelected, setQueue)
    }}/>
  } else {
    if (file.mimeType === "video/mp4") { //only show checkboxes for mp4 videos
    // if (file.mimeType !== "application/vnd.google-apps.folder") {
      return <CheckBoxOutlineBlankIcon onClick={(event) => {
        event.stopPropagation() // this is used to stop the main div from sending onClick events. just this div.
        handleCheckboxClick(file, selected_nodes, setSelected, setQueue)
      }}/>
    }
  }
}

function getIcon(mimeType) {
  switch (mimeType) {
    case "application/vnd.google-apps.folder":
      return <FolderIcon/>
    case "video/mp4":
      return <MovieIcon/>
    case "image/png":
      return <PhotoIcon/>
    case "application/json":
      return <DescriptionIcon/>
    default:
      console.log("No icon set for type \"" + mimeType + "\"")
      return <InsertDriveFileIcon/>
  }
}

export {getCheckbox, getIcon}