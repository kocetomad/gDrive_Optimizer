function getRootFolder(api_key, access_token) {
  return fetch('https://www.googleapis.com/drive/v3/files/root?key=' + api_key, {
    method: 'GET',
    headers: {
      'Authorization': 'Bearer ' + access_token,
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }
  })
}

function getRootChildren(api_key, access_token, root_id) {
  return fetch( // main request
    'https://www.googleapis.com/drive/v3/files?' +
    'q=parents%3D%22' + root_id + '%22' +
    '%20and%20trashed%3Dfalse' +
    '&fields=files(kind%2C%20id%2C%20name%2C%20mimeType%2C%20trashed)' +
    '&key=' + api_key,
    {
      method: 'GET',
      headers: {
        'Authorization': 'Bearer ' + access_token,
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    }
  )
}

export {getRootFolder, getRootChildren}
