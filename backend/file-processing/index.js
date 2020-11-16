var https = require('https');
var fs = require('fs');
const hbjs = require('handbrake-js')
const fetch = require('node-fetch');

const request = require("request");

//downloads a file from gDrive and gets it's metadata 
const download = (path, meta, dest, email, cb) => {
    var request = https.get(path, function (response) {
        var requestmeta = https.get(meta,
            function (response_meta) {
                response_meta.on('data', function (data) {
                    //console.log(JSON.parse(data))
                    let path = "files/" + email;
                    if (!fs.existsSync(path)) {
                        fs.mkdirSync(path);
                    }
                    var file = fs.createWriteStream(path + "/" + JSON.parse(data).name);
                    response.pipe(file);
                    file.on('finish', function () {
                        cb(JSON.parse(data))
                        file.close();
                    });
                });
            }).on('error', function (err) { // Handle errors
                fs.unlink(dest); // Delete the file async. (But we don't check the result)
                if (cb) cb({ err: true, msg: "Download err" });
            });
    }).on('error', function (err) { // Handle errors
        fs.unlink(dest); // Delete the file async. (But we don't check the result)
        if (cb) cb({ err: true, msg: "Download err" });
    });

};

//Video compression using handbrake js
const compress = (folder, callback) => {
    if (!fs.existsSync(folder + "-compressed")) {
        fs.mkdirSync(folder + "-compressed");
    }
    i = 0
    fs.readdir(folder, (err, files) => {
        files.forEach(file => {

            //the regex is used to trim the original file extension 
            hbjs.spawn({ input: folder + "/" + file, output: folder + "-compressed" + "/" + file.replace(/\.[^/.]+$/, "") + '.m4v' })
                .on('error', err => {
                    // invalid user input, no video found etc
                    console.log(err)
                })
                .on('progress', progress => {
                    console.log(
                        'Percent complete: %s, ETA: %s',
                        progress.percentComplete,
                        progress.eta
                    )
                    if (progress.percentComplete == 100) {
                        console.log("finish")
                        i++;

                    }
                    if (i == files.length) {

                        callback(folder + "-compressed")
                    }

                })

        });

    });

}
//Resumable upload to gDrive for big files 
//boilerplate code from https://tanaikech.github.io/2020/03/05/simple-script-of-resumable-upload-with-google-drive-api-for-node.js/
const upload = (folder, token, perentID, callback) => {

    const accessToken = token;

    fs.readdir(folder, (err, files) => {
        i = 0
        files.forEach(file => {
            i++
            const filename = folder + "/" + file;

            const fileSize = fs.statSync(filename).size;
            // 1. Retrieve session for resumable upload.
            request(
                {
                    method: "POST",
                    url:
                        "https://www.googleapis.com/upload/drive/v3/files?uploadType=resumable",
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        name: file,
                        parents:[perentID] 
                    })
                    
                },
                (err, res) => {
                    if (err) {
                        callback(err)
                        console.log(err);
                    }

                    // 2. Upload the file.
                    request(
                        {
                            method: "PUT",
                            url: res.headers.location,
                            headers: { "Content-Range": `bytes 0-${fileSize - 1}/${fileSize}` },
                            body: fs.readFileSync(filename)
                        },
                        (err, res, body) => {
                            if (err) {
                                callback(err)
                                console.log(err);
                            }
                            callback(body)


                        }
                    );
                }
            );
        });
    });
}

//Make a folder for the user's on our drive
const makeFolder = (path, callback) => {
    console.log(path[1].url)
    fetch(path[1].url, path[0]).then(response => response.json()
    ).then(response_json => callback(response_json))
        
};

const share = (path, callback) => {
    fetch(path[1].url, path[0]).then(response => response.json()
    ).then(response_json => callback(response_json))
}

module.exports = {
    download,
    compress,
    upload,
    makeFolder,
    share
}