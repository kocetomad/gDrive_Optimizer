
var async = require("async");
const gAPI = require("../gAPI-queries")
var https = require('https');
var fs = require('fs');


const fetchFile = (req, res, cb) => {
    //async callback, downloads a file from the user's drive/returns download status 
    download(gAPI.download(req.body.fileID, req.body.token), gAPI.getMeta(req.body.fileID, req.body.token), "", function (data) {
        console.log(data)
        res.json({ success: true, msg: data })
    })
}

const download = (path, meta, dest, cb) => {
    var request = https.get(path, function (response) {
        var requestmeta = https.get(meta,
            function (response_meta) {
                response_meta.on('data', function (data) {
                    if (JSON.parse(data)) {
                    }
                    var file = fs.createWriteStream(JSON.parse(data).id + "-" + JSON.parse(data).name);
                    response.pipe(file);
                    file.on('finish', function () {
                        cb("Download complete")
                        file.close();

                    });
                });
            }).on('error', function (err) { // Handle errors
                fs.unlink(dest); // Delete the file async. (But we don't check the result)
                if (cb) cb("Download err");
            });

    }).on('error', function (err) { // Handle errors

        fs.unlink(dest); // Delete the file async. (But we don't check the result)
        if (cb) cb("Download err");
    });

};



module.exports = {
    fetchFile
}