const gAPI = require("../gAPI-queries")
const file = require("../file-processing")
const auth = require("../token_exchange")
var rimraf = require("rimraf");

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
                let path = "files/" + req.body.email
                //Not sure if multiple nested callbacks is optimal but it works well ( ;/ )
                //1.Compressing the files
                //2.Authenticating for gDrive
                //3.Creates a folder for the user files inside our drive
                //4.Uploading onto gdrive
                //5.Shares the folder created in (3) with the user 
                file.compress(path, function (compressed_files) {//1
                    rimraf(path, function () { console.log("dir removed"); });//deletes the uncompressed files from the server
                    auth.get_access_token_using_saved_refresh_token(function (auth_data) {//2
                        console.log(auth_data.access_token, "files/" + compressed_files)
                        file.makeFolder(gAPI.makeFolder(req.body.email, auth_data.access_token), function (folderID) {//3
                            console.log("folder ID:"+(folderID.id))
                            file.upload(compressed_files, auth_data.access_token, folderID.id, function (upload_response) {//4
                                console.log("uploaded:" + upload_response)
                                //deletes the compressed files from the server
                                rimraf(compressed_files, function () { console.log("done"); });
                                file.share(gAPI.createPermissions(folderID.id,req.body.email,auth_data.access_token), function(share_response){//5
                                    console.log("shared:"+share_response)
                                })
                            })
                        })
                        
                    })
                })

                res.json(list)
            }
        })

    });
}

module.exports = {
    fetchFile,
    fetchMultipleFiles
}