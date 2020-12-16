import React from 'react';
import { render, screen } from '@testing-library/react';

import TreeViewContent from "../TreeViewContent";

describe('TreeViewContent', () => {
  it('should render a treeview', () => {
    let placeholder_data = {
      id: "root_folder_id_here",
      name: "Root Folder",
      mimeType: 'application/vnd.google-apps.folder',
      children: [
        {
          id: "child_1",
          name: "Child 1 of Root Folder",
          mimeType: 'video/mp4'
        },
        {
          id: "child_2",
          name: "Child 2 of Root Folder",
          mimeType: 'application/vnd.google-apps.folder',
          children: [
            {
              id: "child_3",
              name: "Child 3 of Child Folder",
              mimeType: 'video/mp4'
            }
          ]
        }
      ]
    }

    render(
      <TreeViewContent files={placeholder_data}/>
    );

    let treeItemRoot = screen.getByText('Root Folder') // get the actual tree item root
    treeItemRoot.click()

    let treeItem2 = screen.getByText('Child 2 of Root Folder')
    expect(screen.getByText('Child 2 of Root Folder'))

    treeItem2.click()
    expect(screen.getByText('Child 3 of Child Folder'))

  });
});
