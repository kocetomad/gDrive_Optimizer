import React from 'react';
import logo from './logo.svg';
import './App.css';
import TreeView from './TreeView.js'
import GDriveLogIn from "./GDriveLogIn";

const API_OUTPUT = {
  "kind": "drive#fileList",
  "nextPageToken": "~!!~AI9FV7QeP3koOwcQ0BM4R-Il_Gce2V3laa52r3xp6UYYKc4sPAVr-kLOEHZyBym2-P0OTljaTyjNCflRk2UPGCKoiLYdkR8SdfkCNDg3GoJV707znrXbOUQEvCu5xBnrE2ZvSRRA0w2RHnSrMVrMM70yld_FKUoR_CJAqfrVkWutXBQ9GkpDDABIOYFOv84rS2c5DFeOCsXkHTF1bumfz_f3KjwUoSNZiYPm7F4jGHPw-j83vaVafhBaHYL46mAv2d3DzOJBSJvvF_tFY80NljIAeml2KH-uhn_hf0nPQ4IWifcik5SLflhcmJhIVp6FT406fSINUcgrWcYWPpk3UDY-3jHTVspmU2W_Ahb8LRqi0EezTjvzydCyYxSL6dAX1vtSytHQMLLy",
  "incompleteSearch": false,
  "files": [
    {
      "kind": "drive#file",
      "id": "1GT7BLOeDI_VTHpfoK__G9vB_eT9gh2-l",
      "name": "resources",
      "mimeType": "application/vnd.google-apps.folder"
    },
    {
      "kind": "drive#file",
      "id": "1WItj1m3uZgsnkA6D6EftuXGNBiBj_k1F",
      "name": "resources",
      "mimeType": "application/vnd.google-apps.folder"
    },
    {
      "kind": "drive#file",
      "id": "1cjGy2k6Yr70IlosLH8qHl5RPtJ2YwxPN",
      "name": "resources",
      "mimeType": "application/vnd.google-apps.folder"
    },
    {
      "kind": "drive#file",
      "id": "1An4XeVtLMlmHdJiv5k1uuUkTGzr95R8n",
      "name": "resources",
      "mimeType": "application/vnd.google-apps.folder"
    },
    {
      "kind": "drive#file",
      "id": "1UH9irztyBB-qbiASBEc-HfjN6xFPK5SR",
      "name": "res",
      "mimeType": "application/vnd.google-apps.folder"
    },
    {
      "kind": "drive#file",
      "id": "1D39W5Nr8KzB-SH2oAjHCwa5uj5jnw8V5",
      "name": "images",
      "mimeType": "application/vnd.google-apps.folder"
    },
    {
      "kind": "drive#file",
      "id": "1jMHLhgy5fJkXpplOaT3xSy3Pq27qB8oF",
      "name": "images",
      "mimeType": "application/vnd.google-apps.folder"
    },
    {
      "kind": "drive#file",
      "id": "1XnqXv6OCjYS41mdKNAp07jRzzOir8Qmy",
      "name": "resources",
      "mimeType": "application/vnd.google-apps.folder"
    },
    {
      "kind": "drive#file",
      "id": "1HWXOZKjCOyQfFeY0FDslhl4Lz613X6RH",
      "name": "images",
      "mimeType": "application/vnd.google-apps.folder"
    },
    {
      "kind": "drive#file",
      "id": "1Qz-n0v8gj7sHIlJ1dXScqbpF4D947NCE",
      "name": "images",
      "mimeType": "application/vnd.google-apps.folder"
    }
  ]
}

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <GDriveLogIn/>
        <TreeView files={API_OUTPUT.files}/>
      </header>
    </div>
  );
}

export default App;
