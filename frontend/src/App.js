import React, {useState} from 'react';
import './App.css';
import TreeViewComponent from './TreeViewComponent.js'
import CompressionMethodComponent from "./CompressionMethodComponent";
import {Col, Container, Nav, Navbar, Row} from "react-bootstrap";
import {GoogleLogin, GoogleLogout} from "react-google-login";

const CLIENT_ID = "796101496132-pif752amrr7vjvq8jqsvo9rf18mg4t24.apps.googleusercontent.com"

function App() {
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");

  const [loggedInState, setLoggedInState] = useState(false);

  const [accessToken, setAccessToken] = useState("");

  const [queue, setQueue] = useState([]); // this is the list of files to compress

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
    setQueue([])
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
        <Container className="h-100">
          <Row className="h-100 align-items-center">
            <Col md={4} className="treeViewComponent h-100">
              {loggedInState && accessToken &&
              <TreeViewComponent queue_setter={setQueue}
                                 access_token={accessToken}
                                 user_email={userEmail}/>}
            </Col>
            <Col md={8} className="compressionComponent align-self-center">
              {loggedInState && accessToken && <CompressionMethodComponent queue={queue} access_token={accessToken} user_email={userEmail}/>}
            </Col>
          </Row>
        </Container>
      </header>
    </div>
  );
}

/**
 * The App module. The root of our React app.
 * @module App
 * */
export default App;
