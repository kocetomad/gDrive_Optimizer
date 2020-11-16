APIkey = process.env.APIkey

const download = (fileID, token) => {
    let file = {
        hostname: "www.googleapis.com",
        path: "/drive/v3/files/" + fileID + "?key=[" + APIkey + "]&alt=media",
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
            "Authorization": "Bearer " + token + ""
        }
    }
    return file
}

const getMeta = (fileID, token) => {
    let meta = {
        hostname: "www.googleapis.com",
        path: "/drive/v3/files/" + fileID + "?key=[" + APIkey + "]",
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
            "Authorization": "Bearer " + token + ""
        }
    }
    return meta;

}

const makeFolder = (folderName, token) => {
    var meta = [];
    options = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
            "Authorization": "Bearer " + token + ""
        },
        body: JSON.stringify({
            "mimeType": "application/vnd.google-apps.folder",
            "name": "compressed videos-" + folderName + ""
        })
    }
    url = {
        url: "https://www.googleapis.com/drive/v3/files?key=[" + APIkey + "]",
    }
    meta.push(options);
    meta.push(url);
    return meta;
}

const createPermissions = (folderID, email, token) => {
    var meta = [];
    options = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
            "Authorization": "Bearer " + token + ""
        },
        body: JSON.stringify({
            "role": "writer",
            "type": "user",
            "emailAddress": "" + email + ""
        })
    }
    url = {
        url: "https://www.googleapis.com/drive/v3/files/" + folderID + "/permissions?emailMessage=%22Your%20files%20have%20been%20compressed%22&key=[" + APIkey + "]",
    }
    meta.push(options);
    meta.push(url);
    return meta;
}

module.exports = {
    download,
    getMeta,
    makeFolder,
    createPermissions
}



