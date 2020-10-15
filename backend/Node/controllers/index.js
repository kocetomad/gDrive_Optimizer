

const gAPI = require("../gAPI-queries")
var https = require('https');
var fs = require('fs');
const fetchFile = (req, res, cb) => {
    download(gAPI.download(req.body.fileID,req.body.token),gAPI.getMeta(req.body.fileID,req.body.token), "", success())
}

const download = (path, meta, dest, cb) => {
    var request = https.get(path, function (response) {
        var requestmeta = https.get(meta,
            function (response_meta) {
                response_meta.on('data', function (data) {
                    console.log(JSON.parse(data));
                    var file = fs.createWriteStream(JSON.parse(data).id + "-" + JSON.parse(data).name);
                    response.pipe(file);
                    file.on('finish', function () {
                        file.close(cb);  // close() is async, call cb after close completes.
                    });
                });
            }).on('error', function (err) { // Handle errors
                fs.unlink(dest); // Delete the file async. (But we don't check the result)
                if (cb) cb(err.message);
            });


    }).on('error', function (err) { // Handle errors
        fs.unlink(dest); // Delete the file async. (But we don't check the result)
        if (cb) cb(err.message);
    });
};

const success = () => { console.log("done") }


module.exports = {
    fetchFile
}