APIkey="AIzaSyBcNCZZIEzsBOI8cyoj-Cb3e8lJe4Qg1Lk"
const download = (fileID,token) => {
    let file = {
        hostname: "www.googleapis.com",
        path: "/drive/v3/files/"+fileID+"?key=["+APIkey+"]&alt=media",
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
          "Authorization": "Bearer "+token+""
        }
    }
    return file
}

const getMeta = (fileID,token) => {
    let meta = {
        hostname: "www.googleapis.com",
        path: "/drive/v3/files/"+fileID+"?key=["+APIkey+"]",
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
          "Authorization": "Bearer "+token+""
        }
    }
    return meta;

}


module.exports = {
    download,
    getMeta
}



