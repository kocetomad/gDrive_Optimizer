import React, {useState} from 'react';
import './App.css';
import TreeViewComponent from './TreeViewComponent.js'
import {Nav, Navbar} from "react-bootstrap";
import {GoogleLogin, GoogleLogout} from "react-google-login";

const CLIENT_ID = "796101496132-pif752amrr7vjvq8jqsvo9rf18mg4t24.apps.googleusercontent.com"

function App() {
  const [userName, setUserName] = useState("");
  const [loggedInState, setLoggedInState] = useState(false);
  const [accessToken, setAccessToken] = useState("");

  let onLoginSuccess = (response) => {
    let userProfile = response.profileObj
    setUserName(userProfile.givenName + " " + userProfile.familyName)

    setLoggedInState(true)
    console.log("Login successful.")
    setAccessToken(response.tokenObj.access_token)
  }

  // what happens when you try to login and process fails
  let onLoginFail = (response) => {
    console.error({result: "Login failed.", output: response})
  }

  // what happens when you log out from Google
  let onLogoutSuccess = () => {
    console.log("Logout successful.")
    setLoggedInState(false)
    setAccessToken("")
  }

  return (
    <div className="App">
      <Navbar bg="light" sticky="top" expand="lg">
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
        {loggedInState && accessToken && <TreeViewComponent access_token={accessToken}/>}
      </header>
    </div>
  );
}

export default App;
