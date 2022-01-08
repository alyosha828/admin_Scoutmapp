var utils = require('./utils');
var multer = require('multer')
var multerUpload = multer({ storage: multer.memoryStorage() })


exports.getDatabase = async function (req, res) {
    var result = await utils.getPlayerDatasFromFireBase(req, res);
    return res.json({
        data: result.data
    })
}


exports.getPlayers = async function (req, res) {
    var result = await utils.getPlayerInfosFromFireBase(req, res);
    return res.json({
        data: result.data
    })
}

exports.getPlayer = async function (req, res) {
    var result = await utils.getPlayerFromFirebase(req, res);
    return res.json({
        data: result.data
    })
}

exports.editPlayer = async function (req, res) {

    var upload = multerUpload.single("avatar-1");
    upload(req, res, async function (err) {
        console.log('Post upload image');
        console.log(req.file);
        if (err) {
            res.json(status, "error");
        } else {
            req.body['file'] = req.file;
            var result = await utils.editPlayerFromFirebase(req, res);
            if (result.success) {
                res.redirect('/players');
            } else {
                res.redirect('/errorEmail');
            }
        }
    });
}

exports.deletePlayer = async function (req, res) {
    var result = await utils.deleteUserFromFireBase(req, res);
    return res.json({
        data: result.data
    })
}