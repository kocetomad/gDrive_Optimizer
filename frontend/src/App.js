import React, {useState} from 'react';
import './App.css';
import TreeView from './TreeView.js'
import {Nav, Navbar} from "react-bootstrap";
import {GoogleLogin, GoogleLogout} from "react-google-login";

const API_KEY = "[AIzaSyBcNCZZIEzsBOI8cyoj-Cb3e8lJe4Qg1Lk]"
const CLIENT_ID = "796101496132-pif752amrr7vjvq8jqsvo9rf18mg4t24.apps.googleusercontent.com"

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
  const [userName, setUserName] = useState(null);
  const [loggedInState, setLoggedInState] = useState(false);

  let onLoginSuccess = (response) => {
    console.log(response)
    console.log({result: "Login Successful.", output: "Token - " + response.tokenObj.access_token})

    let userProfile = response.profileObj
    setUserName(userProfile.givenName + " " + userProfile.familyName)

    setLoggedInState(true)
    //getFiles(response.tokenObj.access_token)
  }

  // what happens when you try to login and process fails
  let onLoginFail = (response) => {
    console.log({result: "Login failed.", output: response})
  }

  // what happens when you log out from Google
  let onLogoutSuccess = () => {
    console.log({result: "Logout successful."})
    setLoggedInState(false)
  }

  let getFiles = (accessToken) => {
    console.log(accessToken)
    fetch( // main request
      'https://www.googleapis.com/drive/v3/files?key=' + API_KEY,
      {
        method: 'GET',
        headers: {
          'Authorization': 'Bearer ' + accessToken,
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      }
    )
      .then(async response => {
        const data = await response.json();

        // check for error response
        if (!response.ok) {
          // get error message from body or default to response statusText
          const error = (data && data.message) || response.statusText;
          return Promise.reject(error);
        }

        console.log(data)
      })
      .catch((error) => {
        console.error({response: 'Error performing fetch!', error: error});
      })
  }

  return (
    <div className="App">
      <Navbar bg="light" expand="lg">
        <Navbar.Brand>gDrive Optimizer</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav"/>
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            {/*<Nav.Link href="#home">Home</Nav.Link>*/}
            {/*<Nav.Link href="#link">Link</Nav.Link>*/}
          </Nav>
          <div style={{paddingRight: "10px"}}>
            {loggedInState && <div>Logged in as <b>{userName}</b></div>}
          </div>

          {!loggedInState && <GoogleLogin
            clientId={CLIENT_ID}
            buttonText="Login"
            scope="https://www.googleapis.com/auth/drive"
            onSuccess={onLoginSuccess}
            onFailure={onLoginFail}
            cookiePolicy={'single_host_origin'}
          />}

          {loggedInState && <GoogleLogout
            clientId={CLIENT_ID}
            buttonText="Logout"
            onLogoutSuccess={onLogoutSuccess}
          />}
        </Navbar.Collapse>
      </Navbar>
      <header className="App-header">
        <TreeView files={API_OUTPUT.files}/>
      </header>
    </div>
  );
}

export default App;
