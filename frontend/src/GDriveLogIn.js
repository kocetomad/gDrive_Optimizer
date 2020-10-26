import React, {useState} from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import {Card} from 'react-bootstrap';
import {GoogleLogin, GoogleLogout} from 'react-google-login';


const API_KEY = "[AIzaSyBcNCZZIEzsBOI8cyoj-Cb3e8lJe4Qg1Lk]"
const CLIENT_ID = "796101496132-pif752amrr7vjvq8jqsvo9rf18mg4t24.apps.googleusercontent.com"

function GDriveLogIn() {
  //const [loggedIn, setLoggedIn] = useState(false);
  const [name, setName] = useState("NAME GOES HERE");
  const [email, setEmail] = useState("EMAIL GOES HERE");

  // what happens when you try to login and process succeeds
  let onLoginSuccess = (response) => {
    console.log(response)
    console.log({result: "Login Successful.", output: "Token - " + response.tokenObj.access_token})

    let profile = {
      name: response.profileObj.givenName + " " + response.profileObj.familyName,
      email: response.profileObj.email
    }

    setName(profile.name)
    setEmail(profile.email)
    console.log("Access token is: " + response.tokenObj.access_token)
    getFiles(response.tokenObj.access_token)
  }

  // what happens when you try to login and process fails
  let onLoginFail = (response) => {
    console.log({result: "Login failed.", output: response})
  }

  // what happens when you log out from Google
  let onLogoutSuccess = () => {
    console.log({result: "Logout successful."})

    setName("NAME GOES HERE")
    setEmail("EMAIL GOES HERE")
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
      .catch(() => {
        console.error('There was an error!');
      })
  }

  return (
    <Card>
      <h2 style={{color: "black"}}>{name}</h2>
      <h2 style={{color: "black"}}>{email}</h2>

      <GoogleLogin
        clientId={CLIENT_ID}
        buttonText="Login"
        scope="https://www.googleapis.com/auth/drive"
        onSuccess={onLoginSuccess}
        onFailure={onLoginFail}
        cookiePolicy={'single_host_origin'}
      />
      <GoogleLogout
        clientId={CLIENT_ID}
        buttonText="Logout"
        onLogoutSuccess={onLogoutSuccess}
      >
      </GoogleLogout>
    </Card>
  )
}

export default GDriveLogIn
