import React from "react";

import FolderIcon from "@material-ui/icons/Folder";
import MovieIcon from "@material-ui/icons/Movie";
import PhotoIcon from "@material-ui/icons/Photo";
import DescriptionIcon from "@material-ui/icons/Description";

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
      console.log("No icon set for type " + mimeType)
      return <div/>
  }
}

export default getIcon