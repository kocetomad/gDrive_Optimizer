const gAPI = require("../gAPI-queries")
const file = require("../file-processing")

//async callback, downloads a file from the user's drive/returns download status 
const fetchFile = (req, res, cb) => {
    file.download(gAPI.download(req.body.fileID, req.body.token), gAPI.getMeta(req.body.fileID, req.body.token), "", req.body.email, function (data) {
        res.json(data)
    })
}
//downloads multiple files, returns file download status for each seperatly
const fetchMultipleFiles = (req, res) => {
    i = 0
    list = { files: [] }
    req.body.fileID.forEach(fileID => {
        file.download(gAPI.download(fileID, req.body.token), gAPI.getMeta(fileID, req.body.token), "", req.body.email, function (data) {
            list.files.push(data)
            i++;
            if (i == req.body.fileID.length) {
                console.log(list)
                let path="files/" + req.body.email
                file.compress(path)
                res.json(list)
            }
        })

    });
}

module.exports = {
    fetchFile,
    fetchMultipleFiles
}