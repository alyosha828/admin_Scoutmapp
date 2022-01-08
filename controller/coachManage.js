var utils = require('./utils');
var multer = require('multer')
var multerUpload = multer({ storage: multer.memoryStorage() })

exports.getDatabase = async function (req, res) {
    var result = await utils.getCoachDatasFromFireBase(req, res);
    return res.json({
        data: result.data
    })
}

exports.getCoaches = async function (req, res) {
    var result = await utils.getCoachInfosFromFireBase(req, res);
    return res.json({
        data: result.data
    })
}
exports.getCoach = async function (req, res) {
    var result = await utils.getCoachFromFirebase(req, res);
    return res.json({
        data: result.data
    })
}

exports.editCoach = async function (req, res) {

    var upload = multerUpload.single("avatar-1");
    upload(req, res, async function (err) {
        console.log('Post upload image');
        console.log(req.file);
        if (err) {
            res.json(status, "error");
        } else {
            req.body['file'] = req.file;
            var result = await utils.editCoachFromFirebase(req, res);
            if (result.success) {
                res.redirect('/coaches');
            } else {
                res.redirect('/errorEmail');
            }
        }
    });
}

exports.deleteCoach = async function (req, res) {
    var result = await utils.deleteUserFromFireBase(req, res);
    return res.json({
        data: result.data
    })
}