const fetch = require('node-fetch');

const get_access_token_using_saved_refresh_token = (callback) => {

    // from the oauth playground
    const refresh_token = process.env.refresh_token;
    // from the API console
    const client_id = process.env.client_id;
    // from the API console
    const client_secret = process.env.client_secret;
    // from https://developers.google.com/identity/protocols/OAuth2WebServer#offline
    const refresh_url = process.env.refresh_url;

    const post_body = `grant_type=refresh_token&client_id=${encodeURIComponent(client_id)}` +
        `&client_secret=${encodeURIComponent(client_secret)}` +
        `&refresh_token=${encodeURIComponent(refresh_token)}`;

    let refresh_request = {
        body: post_body,
        method: "POST",
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    }

    fetch(refresh_url, refresh_request).then(response => response.json()
    ).then(response_json => callback(response_json))
        
}

module.exports = {
    get_access_token_using_saved_refresh_token
}

