import React from "react";

import FolderIcon from "@material-ui/icons/Folder";
import MovieIcon from "@material-ui/icons/Movie";
import PhotoIcon from "@material-ui/icons/Photo";
import DescriptionIcon from "@material-ui/icons/Description";

import CheckBoxIcon from '@material-ui/icons/CheckBox';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';

function getCheckbox(file, selected_nodes) {
  // TODO Checkbox functionality.
  if (selected_nodes.includes(file.id)) {
    return <CheckBoxIcon/>
  } else {
    return <CheckBoxOutlineBlankIcon/>
  }
}

function getIcon(mimeType) {
  switch (mimeType) {
    case "application/vnd.google-apps.folder":
      return <FolderIcon style={{paddingRight: '2dp'}}/>
    case "video/mp4":
      return <MovieIcon/>
    case "image/png":
      return <PhotoIcon/>
    case "application/json":
      return <DescriptionIcon/>
    default:
      console.warn("No icon set for type " + mimeType)
      return <div/>
  }
}

export {getCheckbox, getIcon}