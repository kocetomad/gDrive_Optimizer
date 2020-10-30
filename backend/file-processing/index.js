var https = require('https');
var fs = require('fs');
const hbjs = require('handbrake-js')

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
                    var file = fs.createWriteStream(path + "/" + JSON.parse(data).id + "||" + email + "||" + JSON.parse(data).name);
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
const compress = (folder) => {

    fs.readdir(folder, (err, files) => {
        files.forEach(file => {
            //the regex is used to trim the original file extension 
            hbjs.spawn({ input: folder + "/" + file, output: file.replace(/\.[^/.]+$/, "") + '.m4v' })
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
                })
        });
    });
}



module.exports = {
    download,
    compress
}