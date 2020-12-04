import React, {useState} from 'react';
import './App.css';
import TreeViewComponent from './TreeViewComponent.js'
import {Nav, Navbar} from "react-bootstrap";
import {GoogleLogin, GoogleLogout} from "react-google-login";

const CLIENT_ID = "796101496132-pif752amrr7vjvq8jqsvo9rf18mg4t24.apps.googleusercontent.com"

function App() {
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [loggedInState, setLoggedInState] = useState(false);
  const [accessToken, setAccessToken] = useState("");

  /**
   * @description This is the function callback when login to Google is successful
   * */
  let onLoginSuccess = (response) => {
    let userProfile = response.profileObj
    setUserName(userProfile.givenName + " " + userProfile.familyName)

    setLoggedInState(true)
    console.log("Login successful.")
    setAccessToken(response.tokenObj.access_token)
    setUserEmail(userProfile.email)
  }

  /**
   * @description This is the function callback when login to Google fails
   * */
  let onLoginFail = (response) => {
    console.error({result: "Login failed.", output: response})
  }

  /**
   * @description This is the function callback when you logout from Google
   * */
  let onLogoutSuccess = () => {
    console.log("Logout successful.")
    setLoggedInState(false)
    setAccessToken("")
    setUserName("")
    setUserEmail("")
  }

  return (
    <div className="App">
      <Navbar bg="light" sticky="top" expand="sm">
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
        {loggedInState && accessToken && <TreeViewComponent access_token={accessToken} user_email={userEmail}/>}
      </header>
    </div>
  );
}

/**
 * The App module. The root of our React app.
 * @module App
 * */
export default App;
